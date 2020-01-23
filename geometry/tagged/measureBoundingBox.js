import { max, min } from '@jsxcad/math-vec3';

import { eachPoint } from './eachPoint';
import { measureBoundingBox as measureBoundingBoxOfSolid } from '@jsxcad/geometry-solid';
import { measureBoundingBox as measureBoundingBoxOfSurface } from '@jsxcad/geometry-surface';
import { measureBoundingBox as measureBoundingBoxOfZ0Surface } from '@jsxcad/geometry-z0surface';
import { toKeptGeometry } from './toKeptGeometry';

const measureBoundingBoxGeneric = (geometry) => {
  let minPoint = [Infinity, Infinity, Infinity];
  let maxPoint = [-Infinity, -Infinity, -Infinity];
  let empty = true;
  eachPoint(point => {
    minPoint = min(minPoint, point);
    maxPoint = max(maxPoint, point);
    empty = false;
  },
            geometry);
  if (empty) {
    return [[0, 0, 0], [0, 0, 0]];
  } else {
    return [minPoint, maxPoint];
  }
};

export const measureBoundingBox = (rawGeometry) => {
  const geometry = toKeptGeometry(rawGeometry);
  let empty = true;

  let minPoint = [Infinity, Infinity, Infinity];
  let maxPoint = [-Infinity, -Infinity, -Infinity];

  const update = ([itemMinPoint, itemMaxPoint]) => {
    empty = false;
    minPoint = min(minPoint, itemMinPoint);
    maxPoint = max(maxPoint, itemMaxPoint);
  };

  const walk = (item) => {
    if (item.assembly) {
      item.assembly.forEach(walk);
    } else if (item.layers) {
      item.layers.forEach(walk);
    } else if (item.connection) {
      item.geometries.map(walk);
    } else if (item.disjointAssembly) {
      item.disjointAssembly.forEach(walk);
    } else if (item.item) {
      walk(item.item);
    } else if (item.solid) {
      update(measureBoundingBoxOfSolid(item.solid));
    } else if (item.surface) {
      update(measureBoundingBoxOfSurface(item.surface));
    } else if (item.z0Surface) {
      update(measureBoundingBoxOfZ0Surface(item.z0Surface));
    } else if (item.plan) {
      walk(item.content);
    } else {
      update(measureBoundingBoxGeneric(item));
    }
  };

  walk(geometry);

  if (empty) {
    return [[0, 0, 0], [0, 0, 0]];
  } else {
    return [minPoint, maxPoint];
  }
};
