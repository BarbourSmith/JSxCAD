import { addTag, assemble, difference, flip, intersection, toPaths, toSolid, toZ0Surface, transform, union } from '@jsxcad/algorithm-assembly';

// FIX: Make it clear this should be lazy.
export class Assembly {
  constructor (geometry = { assembly: [] }) {
    this.geometry = geometry;
    if (geometry instanceof Array) throw Error('die');
    if (geometry.geometry) throw Error('die');
  }

  addTag (tag) {
    return fromGeometry(addTag(tag, toGeometry(this)));
  }

  assemble (...geometries) {
    return fromGeometry(assemble(toGeometry(this), ...geometries.map(toGeometry)));
  }

  difference (...geometries) {
    return fromGeometry(difference(toGeometry(this), ...geometries.map(toGeometry)));
  }

  flip () {
    return fromGeometry(flip(toGeometry(this)));
  }

  getTags () {
    const tags = this.geometry.tags;
    if (tags === undefined) {
      return [];
    } else {
      return tags;
    }
  }

  intersection (...geometries) {
    return fromGeometry(intersection(toGeometry(this), ...geometries.map(toGeometry)));
  }

  toGeometry (options = {}) {
    return this.geometry;
  }

  toPaths (options = {}) {
    return toPaths(options, toGeometry(this));
  }

  toSolid (options = {}) {
    return toSolid(options, toGeometry(this));
  }

  toZ0Surface (options = {}) {
    return toZ0Surface(options, toGeometry(this));
  }

  transform (matrix) {
console.log(`QQ/lazy/assembly/transform/this: ${JSON.stringify(this)}`);
console.log(`QQ/lazy/assembly/transform/this/toGeometry: ${JSON.stringify(toGeometry(this))}`);
    // Assembly transforms are eager, but the component transforms may be lazy.
    return fromGeometry(transform(matrix, toGeometry(this)));
  }

  union (...geometries) {
    return fromGeometry(union(toGeometry(this), ...geometries.map(toGeometry)));
  }
}

export const fromGeometry = (geometry) => {
console.log(`QQ/lazy/assembly/fromGeometry: ${JSON.stringify(geometry)}`);
if (geometry instanceof Array) throw Error('die');
  return new Assembly(geometry);
};

const toGeometry = (assembly) => assembly.toGeometry();
