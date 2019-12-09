import { flip as flipPaths } from '@jsxcad/geometry-paths';
import { flip as flipPlane } from '@jsxcad/math-plane';
import { flip as flipPoints } from '@jsxcad/geometry-points';
import { flip as flipSolid } from '@jsxcad/geometry-solid';
import { flip as flipSurface } from '@jsxcad/geometry-surface';

import { rewriteUp } from './rewrite';

export const flip = (geometry) => {
  const op = (geometry) => {
    if (geometry.points) {
      return { ...geometry, points: flipPoints(geometry.points) };
    } else if (geometry.paths) {
      return { ...geometry, paths: flipPaths(geometry.paths) };
    } else if (geometry.surface) {
      return { ...geometry, surface: flipSurface(geometry.surface) };
    } else if (geometry.z0Surface) {
      return { ...geometry, surface: flipSurface(geometry.z0Surface) };
    } else if (geometry.solid) {
      return { ...geometry, solid: flipSolid(geometry.solid) };
    } else if (geometry.assembly) {
      return geometry;
    } else if (geometry.disjointAssembly) {
      return geometry;
    } else if (geometry.plan) {
      if (geometry.plan.connector) {
        // FIX: Mirror visualization?
        return { ...geometry, planes: geometry.planes.map(flipPlane) };
      } else {
        return geometry;
      }
    } else if (geometry.connection) {
      return {
        ...geometry,
        geometries: geometry.geometries.map(flip),
        connectors: geometry.connectors.map(flip)
      };
    } else if (geometry.item) {
      // FIX: How should items deal with flip?
      return geometry;
    } else {
      throw Error(`die: ${JSON.stringify(geometry)}`);
    }
  };
  return rewriteUp(geometry, op);
};

/*
export const flip = (geometry) => {
  const flipped = {};
  if (geometry.points) {
    flipped.points = flipPoints(geometry.points);
  } else if (geometry.paths) {
    flipped.paths = flipPaths(geometry.paths);
  } else if (geometry.surface) {
    flipped.surface = flipSurface(geometry.surface);
  } else if (geometry.z0Surface) {
    flipped.z0Surface = flipSurface(geometry.z0Surface);
  } else if (geometry.solid) {
    flipped.solid = flipSolid(geometry.solid);
  } else if (geometry.assembly) {
    flipped.assembly = geometry.assembly.map(flip);
  } else if (geometry.disjointAssembly) {
    flipped.assembly = geometry.disjointAssembly.map(flip);
  } else if (geometry.plan) {
    if (geometry.plan.connector) {
      flipped.plan = geometry.plan;
      flipped.marks = geometry.marks;
      flipped.planes = geometry.planes.map(flipPlane);
      // FIX: Mirror?
      flipped.visualization = geometry.visualization;
    } else {
      // Leave other plans be for now.
      flipped.plan = geometry.plan;
      flipped.marks = geometry.marks;
      flipped.planes = geometry.planes;
      flipped.visualization = geometry.visualization;
    }
  } else if (geometry.connection) {
    flipped.connection = geometry.connection;
    flipped.geometries = geometry.geometries.map(flip);
    flipped.connectors = geometry.connectors.map(flip);
  } else if (geometry.item) {
    // FIX: How should items deal with flip?
    flipped.item = geometry.item;
  } else {
    throw Error(`die: ${JSON.stringify(geometry)}`);
  }
  flipped.tags = geometry.tags;
  return flipped;
};
*/
