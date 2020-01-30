import Shape$1, { Shape, union, assemble, layer } from './jsxcad-api-v1-shape.js';
import { buildConvexSurfaceHull, buildConvexHull, extrude as extrude$1, lathe as lathe$1, buildConvexMinkowskiSum } from './jsxcad-algorithm-shape.js';
import { getZ0Surfaces, getSurfaces, getAnySurfaces, getPaths, outline as outline$1, getSolids, getPlans } from './jsxcad-geometry-tagged.js';
import { toPlane as toPlane$1, transform, makeConvex, flip as flip$1 } from './jsxcad-geometry-surface.js';
import { toXYPlaneTransforms } from './jsxcad-math-plane.js';
import { transform as transform$1, measureBoundingBox, fromPolygons } from './jsxcad-geometry-solid.js';
import { intersectionOfPathsBySurfaces } from './jsxcad-algorithm-clipper.js';
import { transform as transform$2 } from './jsxcad-geometry-paths.js';
import { isClosed, transform as transform$3, isCounterClockwise, flip } from './jsxcad-geometry-path.js';
import { Y as Y$1, Z as Z$3 } from './jsxcad-api-v1-connector.js';
import { createNormalize3 } from './jsxcad-algorithm-quantize.js';
import { clean } from './jsxcad-geometry-z0surface-boolean.js';
import { section as section$1, cutOpen, fromSolid, containsPoint } from './jsxcad-algorithm-bsp-surfaces.js';
import { toPlane as toPlane$2 } from './jsxcad-math-poly3.js';
import { fromTranslation } from './jsxcad-math-mat4.js';
import { scale } from './jsxcad-math-vec3.js';
import { overcut } from './jsxcad-algorithm-toolpath.js';

/**
 *
 * # Chain Hull
 *
 * Builds a convex hull between adjacent pairs in a sequence of shapes.
 *
 * ::: illustration { "view": { "position": [30, 30, 30] } }
 * ```
 * chainHull(Cube(3).move(-5, 5),
 *           Sphere(3).move(5, -5),
 *           Cylinder(3, 10).move(-10, -10))
 *   .move(10, 10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [80, 80, 0] } }
 * ```
 * chainHull(Circle(20).moveZ(-10),
 *           Circle(10),
 *           Circle(20).moveZ(10))
 * ```
 * :::
 *
 **/

const Z = 2;

const chainHull = (...shapes) => {
  const pointsets = shapes.map(shape => shape.toPoints());
  const chain = [];
  for (let nth = 1; nth < pointsets.length; nth++) {
    const points = [...pointsets[nth - 1], ...pointsets[nth]];
    if (points.every(point => point[Z] === 0)) {
      chain.push(Shape.fromGeometry(buildConvexSurfaceHull(points)));
    } else {
      chain.push(Shape.fromGeometry(buildConvexHull(points)));
    }
  }
  return union(...chain);
};

const chainHullMethod = function (...args) { return chainHull(this, ...args); };
Shape.prototype.chainHull = chainHullMethod;

chainHull.signature = 'chainHull(...shapes:Shape) -> Shape';

/**
 *
 * # Extrude
 *
 * Generates a solid from a surface by linear extrusion.
 *
 * ```
 * shape.extrude(height, depth, { twist = 0, steps = 1 })
 * ```
 *
 * ::: illustration
 * ```
 * Circle(10).cut(Circle(8))
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 60] } }
 * ```
 * Circle(10).cut(Circle(8)).extrude(10)
 * ```
 * :::
 *
 * ::: illustration { "view": { "position": [40, 40, 60] } }
 * ```
 * Triangle(10).extrude(5, -2)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 60] } }
 * ```
 * Triangle(10).extrude(10, 0, { twist: 90, steps: 10 })
 * ```
 * :::
 *
 **/

const extrude = (shape, height = 1, depth = 0, { twist = 0, steps = 1 } = {}) => {
  if (height < depth) {
    [height, depth] = [depth, height];
  }
  const twistRadians = twist * Math.PI / 180;
  // FIX: Handle extrusion along a vector properly.
  const solids = [];
  const keptGeometry = shape.toKeptGeometry();
  for (const { z0Surface, tags } of getZ0Surfaces(keptGeometry)) {
    if (z0Surface.length > 0) {
      const solid = extrude$1(z0Surface, height, depth, steps, twistRadians);
      solids.push(Shape.fromGeometry({ solid, tags }));
    }
  }
  for (const { surface, tags } of getSurfaces(keptGeometry)) {
    if (surface.length > 0) {
      const [toZ0, fromZ0] = toXYPlaneTransforms(toPlane$1(surface));
      const z0SolidGeometry = extrude$1(transform(toZ0, surface), height, depth, steps, twistRadians);
      const solid = transform$1(fromZ0, z0SolidGeometry);
      solids.push(Shape.fromGeometry({ solid, tags }));
    }
  }
  return assemble(...solids);
};

const extrudeMethod = function (...args) { return extrude(this, ...args); };
Shape.prototype.extrude = extrudeMethod;

extrude.signature = 'extrude(shape:Shape, height:number = 1, depth:number = 1, { twist:number = 0, steps:number = 1 }) -> Shape';
extrudeMethod.signature = 'Shape -> extrude(height:number = 1, depth:number = 1, { twist:number = 0, steps:number = 1 }) -> Shape';

const fill = (shape, pathsShape) => {
  const fills = [];
  for (const { surface, z0Surface } of getAnySurfaces(shape.toKeptGeometry())) {
    const anySurface = surface || z0Surface;
    const plane = toPlane$1(anySurface);
    const [to, from] = toXYPlaneTransforms(plane);
    const flatSurface = transform(to, anySurface);
    for (const { paths } of getPaths(pathsShape.toKeptGeometry())) {
      const flatPaths = transform$2(to, paths);
      const flatFill = intersectionOfPathsBySurfaces(flatPaths, flatSurface);
      const fill = transform$2(from, flatFill);
      fills.push(...fill);
    }
  }
  return Shape.fromGeometry({ paths: fills });
};

const fillMethod = function (...args) { return fill(this, ...args); };
Shape.prototype.fill = fillMethod;

const withFillMethod = function (...args) { return assemble(this, fill(this, ...args)); };
Shape.prototype.withFill = withFillMethod;

fill.signature = 'interior(shape:Surface, paths:Paths) -> Paths';
fillMethod.signature = 'Surface -> interior(paths:Paths) -> Paths';
withFillMethod.signature = 'Surface -> interior(paths:Paths) -> Shape';

/**
 *
 * # Hull
 *
 * Builds the convex hull of a set of shapes.
 *
 * ::: illustration { "view": { "position": [30, 30, 30] } }
 * ```
 * hull(Point([0, 0, 10]),
 *      Circle(10))
 * ```
 * :::
 * ::: illustration { "view": { "position": [30, 30, 30] } }
 * ```
 * assemble(Point([0, 0, 10]),
 *          Circle(10))
 *   .hull()
 * ```
 * :::
 * ::: illustration { "view": { "position": [30, 30, 30] } }
 * ```
 * Point([0, 0, 10]).hull(Circle(10))
 * ```
 * :::
 * ::: illustration { "view": { "position": [30, 30, 30] } }
 * ```
 * hull(Circle(4),
 *      Circle(2).move(8));
 * ```
 * :::
 *
 **/

const Z$1 = 2;

const hull = (...shapes) => {
  const points = [];
  shapes.forEach(shape => shape.eachPoint(point => points.push(point)));
  // FIX: Detect planar hulls properly.
  if (points.every(point => point[Z$1] === 0)) {
    return Shape.fromGeometry(buildConvexSurfaceHull(points));
  } else {
    return Shape.fromGeometry(buildConvexHull(points));
  }
};

const hullMethod = function (...shapes) { return hull(this, ...shapes); };
Shape.prototype.hull = hullMethod;

hull.signature = 'hull(shape:Shape, ...shapes:Shape) -> Shape';
hullMethod.signature = 'Shape -> hull(...shapes:Shape) -> Shape';

/**
 *
 * # Interior
 *
 * Generates a surface from the interior of a simple closed path.
 *
 * ::: illustration
 * ```
 * Circle(10)
 * ```
 * :::
 * ::: illustration
 * ```
 * Circle(10)
 *   .outline()
 * ```
 * :::
 * ::: illustration
 * ```
 * Circle(10)
 *   .outline()
 *   .interior()
 * ```
 * :::
 *
 **/

const interior = (shape) => {
  const surfaces = [];
  for (const { paths } of getPaths(shape.toKeptGeometry())) {
    // FIX: Check paths for coplanarity.
    surfaces.push(Shape.fromPathsToSurface(paths.filter(isClosed).filter(path => path.length >= 3)));
  }
  return assemble(...surfaces);
};

const interiorMethod = function (...args) { return interior(this); };
Shape.prototype.interior = interiorMethod;

interior.signature = 'interior(shape:Shape) -> Shape';
interiorMethod.signature = 'Shape -> interior() -> Shape';

/**
 *
 * # Lathe
 *
 * ::: illustration { "view": { "position": [-80, -80, 80] } }
 * ```
 * ```
 * :::
 *
 **/

const lathe = (shape, endDegrees = 360, { sides = 32 } = {}) => {
  const profile = shape.chop(Y$1(0));
  const outline = profile.outline();
  const solids = [];
  for (const geometry of getPaths(outline.toKeptGeometry())) {
    for (const path of geometry.paths) {
      solids.push(Shape.fromGeometry(lathe$1(path, endDegrees * Math.PI / 180, sides)));
    }
  }
  return assemble(...solids);
};

const latheMethod = function (...args) { return lathe(this, ...args); };
Shape.prototype.lathe = latheMethod;

lathe.signature = 'lathe(shape:Shape, endDegrees:number = 360, { resolution:number = 5 })';
latheMethod.signature = 'Shape -> lathe(endDegrees:number = 360, { resolution:number = 5 })';

/**
 *
 * # Minkowski (convex)
 *
 * Generates the minkowski sum of a two convex shapes.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * minkowski(Cube(10),
 *           Sphere(3));
 * ```
 * :::
 *
 **/

// TODO: Generalize for more operands?
const minkowski = (a, b) => {
  const aPoints = [];
  const bPoints = [];
  a.eachPoint(point => aPoints.push(point));
  b.eachPoint(point => bPoints.push(point));
  return Shape.fromGeometry(buildConvexMinkowskiSum(aPoints, bPoints));
};

const minkowskiMethod = function (shape) { return minkowski(this, shape); };
Shape.prototype.minkowski = minkowskiMethod;

minkowski.signature = 'minkowski(a:Shape, b:Shape) -> Shape';

/**
 *
 * # Outline
 *
 * Generates the outline of a surface.
 *
 * ::: illustration
 * ```
 * difference(Circle(10),
 *            Circle(2).move([-4]),
 *            Circle(2).move([4]))
 * ```
 * :::
 * ::: illustration
 * ```
 * difference(Circle(10),
 *            Circle(2).move([-4]),
 *            Circle(2).move([4]))
 *   .outline()
 * ```
 * :::
 *
 **/

const outline = (shape) =>
  assemble(...outline$1(shape.toGeometry()).map(outline => Shape.fromGeometry(outline)));

const outlineMethod = function (options) { return outline(this); };
const withOutlineMethod = function (options) { return assemble(this, outline(this)); };

Shape.prototype.outline = outlineMethod;
Shape.prototype.withOutline = withOutlineMethod;

outline.signature = 'outline(shape:Surface) -> Shape';
outlineMethod.signature = 'Shape -> outline() -> Shape';
withOutlineMethod.signature = 'Shape -> outline() -> Shape';

/**
 *
 * # Section
 *
 * Produces a cross-section of a solid as a surface.
 *
 * ::: illustration { "view": { "position": [40, 40, 60] } }
 * ```
 * difference(Cylinder(10, 10),
 *            Cylinder(8, 10))
 * ```
 * :::
 * ::: illustration
 * ```
 * difference(Sphere(10),
 *            Sphere(8))
 *   .section()
 * ```
 * :::
 * ::: illustration
 * ```
 * difference(Sphere(10),
 *            Sphere(8))
 *   .section()
 *   .outline()
 * ```
 * :::
 *
 **/

const toPlane = (connector) => {
  for (const entry of getPlans(connector.toKeptGeometry())) {
    if (entry.plan && entry.plan.connector) {
      return entry.planes[0];
    }
  }
};

const toSurface = (plane) => {
  const max = +1e5;
  const min = -1e5;
  const [, from] = toXYPlaneTransforms(plane);
  const path = [[max, max, 0], [min, max, 0], [min, min, 0], [max, min, 0]];
  const polygon = transform$3(from, path);
  return [polygon];
};

const section = (solidShape, ...connectors) => {
  if (connectors.length === 0) {
    connectors.push(Z$3(0));
  }
  const planes = connectors.map(toPlane);
  const planeSurfaces = planes.map(toSurface);
  const shapes = [];
  const normalize = createNormalize3();
  for (const { solid } of getSolids(solidShape.toKeptGeometry())) {
    const sections = section$1(solid, planeSurfaces, normalize);
    const surfaces = sections.map(section => makeConvex(section, normalize));
    // const surfaces = sections.map(section => z0Clean(section, normalize));
    // const surfaces = sections.map(section => section);
    // const surfaces = sections;
    for (let i = 0; i < surfaces.length; i++) {
      surfaces[i].plane = planes[i];
      shapes.push(Shape.fromGeometry({ surface: surfaces[i] }));
    }
  }
  const coords = new Set();
  for (const shape of shapes) {
    for (const point of shape.toPoints()) {
      coords.add(point);
    }
  }
  for (const coord of coords) {
    console.log(`QQ/coord: ${JSON.stringify(coord)}`);
  }
  return layer(...shapes);
};

const sectionMethod = function (...args) { return section(this, ...args); };
Shape.prototype.section = sectionMethod;

const cleanOp = (shape) => {
  const shapes = [];
  const normalize3 = createNormalize3();
  for (const { surface, z0Surface } of getAnySurfaces(shape.toKeptGeometry())) {
    shapes.push(Shape.fromGeometry({ paths: clean(surface || z0Surface, normalize3) }));
  }
  return layer(...shapes);
};
const cleanMethod = function (...args) { return cleanOp(this); };
Shape.prototype.clean = cleanMethod;

const squash = (shape) => {
  const geometry = shape.toKeptGeometry();
  const result = { layers: [] };
  for (const { solid } of getSolids(geometry)) {
    const polygons = [];
    for (const surface of solid) {
      for (const path of surface) {
        const flat = path.map(([x, y]) => [x, y, 0]);
        if (toPlane$2(flat) === undefined) continue;
        polygons.push(isCounterClockwise(flat) ? flat : flip(flat));
      }
    }
    result.layers.push({ z0Surface: clean(polygons) });
  }
  for (const { surface } of getSurfaces(geometry)) {
    const polygons = [];
    for (const path of surface) {
      const flat = path.map(([x, y]) => [x, y, 0]);
      if (toPlane$2(flat) === undefined) continue;
      polygons.push(isCounterClockwise(flat) ? flat : flip(flat));
    }
    result.layers.push({ z0Surface: polygons });
  }
  for (const { z0Surface } of getZ0Surfaces(geometry)) {
    const polygons = [];
    for (const path of z0Surface) {
      polygons.push(path);
    }
    result.layers.push({ z0Surface: polygons });
  }
  for (const { paths } of getPaths(geometry)) {
    const flatPaths = [];
    for (const path of paths) {
      flatPaths.push(path.map(([x, y]) => [x, y, 0]));
    }
    result.layers.push({ paths: flatPaths });
  }
  return Shape$1.fromGeometry(result);
};

const squashMethod = function () { return squash(this); };
Shape$1.prototype.squash = squashMethod;

/**
 *
 * # Stretch
 *
 **/

const toPlaneFromConnector = (connector) => {
  for (const entry of getPlans(connector.toKeptGeometry())) {
    if (entry.plan && entry.plan.connector) {
      return entry.planes[0];
    }
  }
};

const toSurface$1 = (plane) => {
  const max = +1e5;
  const min = -1e5;
  const [, from] = toXYPlaneTransforms(plane);
  const path = [[max, max, 0], [min, max, 0], [min, min, 0], [max, min, 0]];
  const polygon = transform$3(from, path);
  return [polygon];
};

const stretch = (shape, length, connector = Z$3()) => {
  const stretches = [];
  const planeSurface = toSurface$1(toPlaneFromConnector(connector));
  for (const { solid, tags } of getSolids(shape.toKeptGeometry())) {
    if (solid.length === 0) {
      continue;
    }
    const bottom = cutOpen(solid, planeSurface);
    const [profile] = section$1(solid, [planeSurface]);
    const top = cutOpen(solid, flip$1(planeSurface));
    const [toZ0, fromZ0] = toXYPlaneTransforms(toPlane$1(profile));
    const z0SolidGeometry = extrude$1(transform(toZ0, profile), length, 0, 1, 0, false);
    const middle = transform$1(fromZ0, z0SolidGeometry);
    const topMoved = transform$1(fromTranslation(scale(length, toPlane$1(profile))), top);
    stretches.push(Shape.fromGeometry({ solid: [...bottom, ...middle, ...topMoved], tags }));
  }

  return assemble(...stretches);
};

const method = function (...args) { return stretch(this, ...args); };
Shape.prototype.stretch = method;

/**
 *
 * # Sweep
 *
 * Sweep a tool profile along a path, to produce a surface.
 *
 **/

// FIX: This is a weak approximation assuming a 1d profile -- it will need to be redesigned.
const sweep = (toolpath, tool) => {
  const chains = [];
  for (const { paths } of getPaths(toolpath.toKeptGeometry())) {
    for (const path of paths) {
      chains.push(chainHull(...path.map(point => tool.move(...point))));
    }
  }
  return union(...chains);
};

const sweepMethod = function (tool) { return sweep(this, tool); };

Shape.prototype.sweep = sweepMethod;
Shape.prototype.withSweep = function (tool) { return assemble(this, sweep(this, tool)); };

// Return an assembly of paths so that each toolpath can have its own tag.
const toolpath = (shape, radius = 1, { overcut: overcut$1 = 0, joinPaths = false } = {}) =>
  Shape.fromGeometry({ paths: overcut(shape.outline().toKeptGeometry(), radius, overcut$1, joinPaths) });

const method$1 = function (...options) { return toolpath(this, ...options); };

Shape.prototype.toolpath = method$1;
Shape.prototype.withToolpath = function (...args) { return assemble(this, toolpath(this, ...args)); };

const X = 0;
const Y = 1;
const Z$2 = 2;

const voxels = (shape, resolution = 1) => {
  const offset = resolution / 2;
  const voxels = [];
  for (const { solid, tags } of getSolids(shape.toKeptGeometry())) {
    const [min, max] = measureBoundingBox(solid);
    const bsp = fromSolid(solid, createNormalize3());
    const polygons = [];
    for (let x = min[X] - offset; x <= max[X] + offset; x += resolution) {
      for (let y = min[Y] - offset; y <= max[Y] + offset; y += resolution) {
        for (let z = min[Z$2] - offset; z <= max[Z$2] + offset; z += resolution) {
          const state = containsPoint(bsp, [x, y, z]);
          if (state !== containsPoint(bsp, [x + resolution, y, z])) {
            const face = [[x + offset, y - offset, z - offset],
                          [x + offset, y + offset, z - offset],
                          [x + offset, y + offset, z + offset],
                          [x + offset, y - offset, z + offset]];
            polygons.push(state ? face : face.reverse());
          }
          if (state !== containsPoint(bsp, [x, y + resolution, z])) {
            const face = [[x - offset, y + offset, z - offset],
                          [x + offset, y + offset, z - offset],
                          [x + offset, y + offset, z + offset],
                          [x - offset, y + offset, z + offset]];
            polygons.push(state ? face.reverse() : face);
          }
          if (state !== containsPoint(bsp, [x, y, z + resolution])) {
            const face = [[x - offset, y - offset, z + offset],
                          [x + offset, y - offset, z + offset],
                          [x + offset, y + offset, z + offset],
                          [x - offset, y + offset, z + offset]];
            polygons.push(state ? face : face.reverse());
          }
        }
      }
    }
    voxels.push(Shape.fromGeometry({ solid: fromPolygons({}, polygons), tags }));
  }
  return assemble(...voxels);
};

const vowelsMethod = function (...args) { return voxels(this, ...args); };
Shape.prototype.voxels = vowelsMethod;

const api = {
  chainHull,
  extrude,
  fill,
  hull,
  interior,
  lathe,
  minkowski,
  outline,
  section,
  squash,
  stretch,
  sweep,
  toolpath,
  voxels
};

export default api;
export { chainHull, extrude, fill, hull, interior, lathe, minkowski, outline, section, squash, stretch, sweep, toolpath, voxels };
