import { add, subtract, normalize, dot, transform, scale, squaredDistance } from './jsxcad-math-vec3.js';
import { getNonVoidSolids, getAnyNonVoidSurfaces, taggedSurface, union, taggedAssembly, getSolids, taggedLayers, getNonVoidPaths, taggedPaths } from './jsxcad-geometry-tagged.js';
import { Hull } from './jsxcad-api-v1-extrude.js';
import Shape$1, { Shape } from './jsxcad-api-v1-shape.js';
import { Sphere } from './jsxcad-api-v1-shapes.js';
import { createNormalize3 } from './jsxcad-algorithm-quantize.js';
import { fromRotation } from './jsxcad-math-mat4.js';
import { getEdges } from './jsxcad-geometry-path.js';
import { closestSegmentBetweenLines } from './jsxcad-math-line3.js';
import { outlineSurface } from './jsxcad-geometry-halfedge.js';
import { toPlane } from './jsxcad-geometry-surface.js';
import { toConvexClouds, fromSolid } from './jsxcad-geometry-bsp.js';
import { fromPolygon } from './jsxcad-math-plane.js';

/**
 *
 * # Shell
 *
 * Converts a solid into a hollow shell of a given thickness.
 *
 * ::: illustration
 * ```
 * Cube(10).shell(1);
 * ```
 * :::
 *
 **/

const START = 0;
const END = 1;

const Shell = (radius = 1, resolution = 3, ...shapes) => {
  const normalize3 = createNormalize3();
  resolution = Math.max(resolution, 3);
  const pieces = [];
  for (const shape of shapes) {
    for (const { solid, tags = [] } of getNonVoidSolids(
      shape.toDisjointGeometry()
    )) {
      for (const surface of solid) {
        for (const polygon of surface) {
          pieces.push(
            Hull(
              ...polygon.map((point) =>
                Sphere(radius, { resolution }).move(...point)
              )
            )
              .setTags(tags)
              .toGeometry()
          );
        }
      }
    }
    // FIX: This is more expensive than necessary.
    const surfaces = [];
    for (const { surface, z0Surface } of getAnyNonVoidSurfaces(
      shape.toDisjointGeometry()
    )) {
      const thisSurface = surface || z0Surface;
      const plane = toPlane(thisSurface);
      const rotate90 = fromRotation(Math.PI / -2, plane);
      const getDirection = (start, end) => normalize(subtract(end, start));
      const getOffset = ([start, end]) => {
        const direction = getDirection(start, end);
        const offset = transform(rotate90, scale(radius, direction));
        return offset;
      };
      const getOuter = (offset, [start, end]) => [
        add(start, offset),
        add(end, offset),
      ];
      const getInner = (offset, [start, end]) => [
        subtract(start, offset),
        subtract(end, offset),
      ];
      for (const path of outlineSurface(thisSurface, normalize3)) {
        const edges = getEdges(path);
        let last = edges[edges.length - 2];
        let current = edges[edges.length - 1];
        let next = edges[0];
        for (
          let nth = 0;
          nth < edges.length;
          last = current, current = next, next = edges[++nth]
        ) {
          const lastOffset = getOffset(last);
          const currentOffset = getOffset(current);
          const nextOffset = getOffset(next);
          const lastOuter = getOuter(lastOffset, last);
          const lastInner = getInner(lastOffset, last);
          const currentOuter = getOuter(currentOffset, current);
          const currentInner = getInner(currentOffset, current);
          const nextOuter = getOuter(nextOffset, next);
          const nextInner = getInner(nextOffset, next);
          // FIX: The projected offsets can cross.
          const startOuter =
            closestSegmentBetweenLines(lastOuter, currentOuter)[END] ?? currentOuter[START];
          const endOuter =
            closestSegmentBetweenLines(currentOuter, nextOuter)[START] ?? currentOuter[END];
          const startInner =
            closestSegmentBetweenLines(lastInner, currentInner)[END] ?? currentInner[START];
          const endInner =
            closestSegmentBetweenLines(currentInner, nextInner)[START] ?? currentInner[END];
          // Build an offset surface.
          const polygon = [endOuter, endInner, startInner, startOuter];
          const currentDirection = getDirection(current[0], current[1]);
          if (dot(currentDirection, getDirection(startOuter, endOuter)) < 0) {
            // Swap the direction of the outer offset.
            polygon[0] = startOuter;
            polygon[3] = endOuter;
          }
          if (dot(currentDirection, getDirection(startInner, endInner)) < 0) {
            // Swap the direction of the inner offset.
            polygon[1] = startInner;
            polygon[2] = endInner;
          }
          // These need to be distinct surfaces so that they can be unioned.
          surfaces.push(taggedSurface({}, [polygon]));
        }
      }
      pieces.push(union(...surfaces));
    }
  }

  return Shape.fromGeometry(taggedAssembly({}, ...pieces));
};

const shellMethod = function (radius, resolution) {
  return Shell(radius, resolution, this);
};
Shape.prototype.shell = shellMethod;

const outerShellMethod = function (radius, resolution) {
  return Shell(radius, resolution, this).cut(this);
};
Shape.prototype.outerShell = outerShellMethod;

const innerShellMethod = function (radius, resolution) {
  return Shell(radius, resolution, this).clip(this);
};
Shape.prototype.innerShell = innerShellMethod;

const grow = (shape, amount = 1, { resolution = 3 } = {}) => {
  const normalize = createNormalize3();
  resolution = Math.max(resolution, 3);
  const pieces = [];
  for (const { solid, tags = [] } of getSolids(shape.toDisjointGeometry())) {
    for (const cloud of toConvexClouds(
      fromSolid(solid, normalize),
      normalize
    )) {
      pieces.push(
        Hull(...cloud.map((point) => Sphere(amount, resolution).move(...point)))
          .setTags(tags)
          .toGeometry()
      );
    }
  }
  return Shape.fromGeometry(taggedLayers({}, ...pieces));
};

const growMethod = function (...args) {
  return grow(this, ...args);
};
Shape.prototype.grow = growMethod;

const INTERSECTION_THRESHOLD = 1e-5;

const START$1 = 0;
const END$1 = 1;

/*

5<   >2
0  T  3
1i> <j4

slice(j + 1), slice(0, i + 1), T
slice(i + 1, j + 1), T

*/

const resolveSelfIntersections = (path, plane, resolved) => {
  const todo = [path];
  let n = 0;
  while (todo.length > 0) {
    const walk = (path) => {
      const planeOfPath = fromPolygon(path);
      if (planeOfPath === undefined) {
        return;
      }
      const at = (nth) => path[nth % path.length];
console.log(`QQ/walk: ${path.length} ${n++} ${todo.length}`);
      // FIX: Use an appropriate spatial decomposition.
      for (let i = 0; i < path.length; i++) {
        const iStart = at(i);
        const iEnd = at(i + 1);
        for (let j = i + 2; j < path.length; j++) {
          if ((j + 1) % path.length === i) {
            continue;
          }
          const jStart = at(j);
          const jEnd = at(j + 1);
          const [from, to] = closestSegmentBetweenLines([iStart, iEnd], [jStart, jEnd]);
          if (from === null || to === null) {
            continue;
          }
          if (squaredDistance(from, to) < INTERSECTION_THRESHOLD) {
            console.log(`QQ: i=${i} j=${j} l=${path.length}`);
            // We've found a self-intersection.
            // Chop the loop.
            if (i < j) {
              // [a, b, c, d@i, e, f, g@j, h, i]
              // to
              // [e, f, g, to]
              // [a, b, c, d, from, h, i]
              todo.push([...path.slice(i + 1, j + 1), to]);
              todo.push([...path.slice(j + 1), ...path.slice(0, i + 1), from]);
              return;
            } else {
              todo.push([...path.slice(j + 1, i + 1), to]);
              todo.push([...path.slice(i + 1), ...path.slice(0, j + 1), from]);
              return;
            }
          }
        }
      }
      // no self-intersections, this path is done.
      if (dot(plane, planeOfPath) > 0) {
        resolved.push(path);
      }
    };
    walk(todo.pop());
  }
};

const offset = (shape, radius = 1, resolution = 16) => {
  const offsetPathsets = [];
  for (const { tags, paths } of getNonVoidPaths(shape.toDisjointGeometry())) {
    const resolved = [];
    for (const path of paths) {
      // Let's assume this path has a coherent plane.
      const plane = fromPolygon(path);
      const rotate90 = fromRotation(Math.PI / -2, plane);
      const getDirection = (start, end) => normalize(subtract(end, start));
      const getOffset = ([start, end]) => {
        const direction = getDirection(start, end);
        const offset = transform(rotate90, scale(radius, direction));
        return offset;
      };
      const getOuter = (offset, [start, end]) => [
        add(start, offset),
        add(end, offset),
      ];

      const offsetPath = [];
      const edges = getEdges(path);
      let last = edges[edges.length - 2];
      let current = edges[edges.length - 1];
      let next = edges[0];
      for (
        let nth = 0;
        nth < edges.length;
        last = current, current = next, next = edges[++nth]
      ) {
        const lastOffset = getOffset(last);
        const currentOffset = getOffset(current);
        const nextOffset = getOffset(next);
        const lastOuter = getOuter(lastOffset, last);
        const currentOuter = getOuter(currentOffset, current);
        const nextOuter = getOuter(nextOffset, next);
        const startOuter =
          closestSegmentBetweenLines(lastOuter, currentOuter)[END$1] ?? currentOuter[START$1];
        const endOuter =
          closestSegmentBetweenLines(currentOuter, nextOuter)[START$1] ?? currentOuter[END$1];
        // Build an offset surface.
        const currentDirection = getDirection(current[0], current[1]);
        if (dot(currentDirection, getDirection(startOuter, endOuter)) < 0) {
          offsetPath.push(startOuter);
        } else {
          offsetPath.push(endOuter);
        }
      }
      resolveSelfIntersections(offsetPath, plane, resolved);
    }
    offsetPathsets.push(taggedPaths({ tags }, resolved));
  }
console.log(`QQ/resolved: ${offsetPathsets.length}`);
  return Shape.fromGeometry(taggedAssembly({}, ...offsetPathsets));
};

const offsetMethod = function (radius, resolution) {
  return offset(this, radius, resolution);
};
Shape.prototype.offset = offsetMethod;

const shrink = (shape, amount, { resolution = 3 } = {}) => {
  if (amount === 0) {
    return shape;
  } else {
    return shape.cut(Shell(amount, { resolution }, shape));
  }
};

const shrinkMethod = function (amount, { resolution = 3 } = {}) {
  return shrink(this, amount, { resolution });
};
Shape$1.prototype.shrink = shrinkMethod;

const api = {
  Shell,
  grow,
  offset,
  shrink,
};

export default api;
export { Shell, grow, offset, shrink };
