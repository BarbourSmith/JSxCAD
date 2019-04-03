// FIX: Add interface to change default surface geometry.

import { Assembly } from './Assembly';
import { canonicalize } from '@jsxcad/algorithm-polygons';
import { fromPaths } from '@jsxcad/geometry-surf2pc';
import { toGeometry } from './toGeometry';
import { writePdf } from './writePdf';

export class CAG {
  as (tag) {
    return Assembly.fromGeometries([this.geometry]).as(tag);
  }

  constructor (geometry) {
    this.geometry = geometry || fromPaths({}, []);
  }

  difference (...shapes) {
    return CAG.fromGeometry(this.geometry.difference(...shapes.map(toGeometry)));
  }

  intersection (...shapes) {
    return CAG.fromGeometry(this.geometry.intersection(...shapes.map(toGeometry)));
  }

  material (material) {
    return Assembly.fromGeometries([this.geometry]).material(material);
  }

  transform (matrix) {
    return CAG.fromGeometry(this.geometry.transform(matrix));
  }

  toPaths (options = {}) {
    return this.toPolygons(options);
  }

  toGeometry () {
    return this.geometry;
  }

  toPolygons (options) {
    return this.geometry.toPaths(options);
  }

  union (...shapes) {
    return CAG.fromGeometry(this.geometry.union(...shapes.map(toGeometry)));
  }

  writePdf (options = {}) {
    writePdf(options, this);
    return this;
  }
}

CAG.fromGeometry = (geometry) => new CAG(geometry);
CAG.fromPaths = (paths) => CAG.fromGeometry(fromPaths({}, canonicalize(paths)));

// BREAKING: Direction was not significant for CAG.fromPoints, but now is.
CAG.fromPoints = (points) => CAG.fromPaths([points]);
CAG.fromPolygons = (polygons) => CAG.fromPaths(polygons);
