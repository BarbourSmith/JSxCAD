import { flip, rotateX } from '@jsxcad/geometry-path';

import { cache } from '@jsxcad/cache';
import { fromPolygons as toSolidFromPolygons } from '@jsxcad/geometry-solid';

const buildWalls = (polygons, floor, roof) => {
  for (let start = floor.length - 1, end = 0; end < floor.length; start = end++) {
    if (floor[start] === null || floor[end] === null) {
      continue;
    }
    // Remember that we are walking CCW.
    polygons.push([floor[start], floor[end], roof[end], roof[start]].reverse());
  }
};

// Rotate a path around the X axis to produce the polygons of a solid.
const latheImpl = (path, endRadians = Math.PI * 2, resolution = 1) => {
  const stepRadians = endRadians / resolution;
  let lastPath;
  const polygons = [];
  if (endRadians !== Math.PI * 2) {
    polygons.push(flip(path), rotateX(endRadians, path));
  }
  for (let radians = 0; radians < endRadians; radians += stepRadians) {
    const rotatedPath = rotateX(radians, path);
    if (lastPath !== undefined) {
      buildWalls(polygons, rotatedPath, lastPath);
    }
    lastPath = rotatedPath;
  }
  if (lastPath !== undefined) {
    buildWalls(polygons, rotateX(endRadians, path), lastPath);
  }
  return { solid: toSolidFromPolygons({}, polygons) };
};

export const lathe = cache(latheImpl);
