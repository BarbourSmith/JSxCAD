import { fromScaling, fromTranslation } from './jsxcad-math-mat4.js';
import { transform as transform$1, canonicalize as canonicalize$1, getEdges, flip as flip$1, toGeneric as toGeneric$1, toPolygon, toZ0Polygon } from './jsxcad-geometry-path.js';
import { fromPoint, min, max, subtract, length, add, scale as scale$1, normalize } from './jsxcad-math-vec3.js';

const transform = (matrix, paths) =>
  paths.map((path) => transform$1(matrix, path));

const butLast = (paths) => paths.slice(0, paths.length - 1);

const canonicalize = (paths) => {
  let canonicalized = paths.map(canonicalize$1);
  if (paths.properties !== undefined) {
    // Transfer properties.
    canonicalized.properties = paths.properties;
  }
  return canonicalized;
};

// FIX: Determine the correct behaviour here.

const difference = (pathset, ...pathsets) => pathset;

const eachPoint = (thunk, paths) => {
  for (const path of paths) {
    for (const point of path) {
      if (point !== null) {
        thunk(point);
      }
    }
  }
};

// Expects aligned vertices.

const findOpenEdges = (paths, isOpen) => {
  const test = (closed) => (isOpen ? !closed : closed);

  const edges = new Set();

  for (const path of paths) {
    for (const edge of getEdges(path)) {
      // FIX: serialization should be unnecessary.
      edges.add(JSON.stringify(edge));
    }
  }

  const openEdges = [];
  for (const path of paths) {
    for (const [start, end] of getEdges(path)) {
      if (test(edges.has(JSON.stringify([end, start])))) {
        openEdges.push([start, end]);
      }
    }
  }

  return openEdges;
};

const flip = (paths) => paths.map(flip$1);

const intersection = (pathset, ...pathsets) => pathset;

const last = (paths) =>
  paths.length >= 1 ? paths[paths.length - 1] : [null];

// returns an array of two Vector3Ds (minimum coordinates and maximum coordinates)
const measureBoundingBox = (paths) => {
  let minPoint;
  let maxPoint;
  eachPoint((point) => {
    minPoint =
      minPoint === undefined
        ? fromPoint(point)
        : min(minPoint, fromPoint(point));
    maxPoint =
      maxPoint === undefined
        ? fromPoint(point)
        : max(maxPoint, fromPoint(point));
  }, paths);
  return [minPoint, maxPoint];
};

const segment = (paths, start, end) => {
  const segments = [];
  let segment = [];
  let position = 0;
  let collecting = false;
  for (const path of paths) {
    for (const [first, second] of getEdges(path)) {
      const vector = subtract(second, first);
      const nextPosition = position + length(vector);
      if (collecting === false) {
        if (nextPosition >= start) {
          const point = add(first, scale$1(start - position, normalize(vector)));
          // The segments are always open paths.
          segment.push(null, point);
          if (start - position < 0) {
            throw Error('die');
          }
          collecting = true;
        }
      }
      if (collecting === true) {
        if (position > start && segment.length === 0) {
          segment.push(first);
        }
        if (nextPosition >= end) {
          const point = add(first, scale$1(end - position, normalize(vector)));
          segment.push(point);
          segments.push(segment);
          return segments;
        } else {
          segment.push(second);
        }
      }
      position = nextPosition;
    }
    if (segment.length > 0) {
      segments.push(segment);
      segment = [];
    }
  }
  return segments;
};

/**
 * Transforms each path of Paths.
 *
 * @param {Paths} original - the Paths to transform.
 * @param {Function} [transform=identity] - function used to transform the paths.
 * @returns {Paths} the transformed paths.
 */
const map = (original, transform) => {
  if (original === undefined) {
    original = [];
  }
  if (transform === undefined) {
    transform = (_) => _;
  }
  // FIX: Consider optimizing this to return the original if all transforms are identity transforms.
  return original.map((path) => transform(path));
};

const toGeneric = (paths) => map(paths, toGeneric$1);

const toPoints = (paths) => {
  const points = [];
  eachPoint((point) => points.push(point), paths);
  return points;
};

const toPolygons = (paths) => {
  if (paths.isPolygons !== true) {
    paths = map(paths, toPolygon);
    paths.isPolygons = true;
  }
  return paths;
};

const toZ0Polygons = (paths) => {
  if (paths.isZ0Polygons !== true) {
    paths = map(paths, toZ0Polygon);
    paths.isZ0Polygons = true;
  }
  return paths;
};

// FIX: Deduplication.

const union = (...pathsets) => [].concat(...pathsets);

const scale = ([x = 1, y = 1, z = 1], paths) =>
  transform(fromScaling([x, y, z]), paths);
const translate = ([x = 0, y = 0, z = 0], paths) =>
  transform(fromTranslation([x, y, z]), paths);

export { butLast, canonicalize, difference, eachPoint, findOpenEdges, flip, intersection, last, measureBoundingBox, scale, segment, toGeneric, toPoints, toPolygons, toZ0Polygons, transform, translate, union };
