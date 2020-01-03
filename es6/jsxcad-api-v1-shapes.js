import Shape$1, { union, Shape } from './jsxcad-api-v1-shape.js';
import { Sphere, Circle } from './jsxcad-api-v1-shapes.js';
import { getSolids, outline } from './jsxcad-geometry-tagged.js';
import { hull, outline as outline$1 } from './jsxcad-api-v1-extrude.js';
import { toSegments } from './jsxcad-geometry-path.js';

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

const shell = (shape, radius = 1, resolution = 8) => {
  resolution = Math.max(resolution, 3);
  const keptGeometry = shape.toKeptGeometry();
  const shells = [];
  for (const { solid, tags = [] } of getSolids(keptGeometry)) {
    const pieces = [];
    for (const surface of solid) {
      for (const polygon of surface) {
        pieces.push(hull(...polygon.map(point => Sphere(radius, resolution).move(...point))));
      }
    }
    shells.push(union(...pieces).as(...tags));
  }
  for (const { paths, tags = [] } of outline(keptGeometry)) {
    const pieces = [];
    for (const path of paths) {
      for (const segment of toSegments({}, path)) {
        // FIX: Handle non-z0-surfaces properly.
        pieces.push(hull(...segment.map(([x, y]) => Circle(radius, resolution).move(x, y))));
      }
    }
    shells.push(union(...pieces).as(...tags));
  }
  return union(...shells);
};

const method = function (radius, resolution) { return shell(this, radius, resolution); };
Shape.prototype.shell = method;

/**
 *
 * # expand
 *
 * Moves the edges of the shape inward by the specified amount.
 *
 * ::: illustration { "view": { "position": [60, -60, 60], "target": [0, 0, 0] } }
 * ```
 * Cube(10).with(Cube(10).moveX(10).expand(2))
 * ```
 * :::
 **/

const expand = (shape, amount = 1, { resolution = 16 } = {}) =>
  (amount >= 0)
    ? shape.union(shell(shape, amount, resolution))
    : shape.cut(shell(shape, -amount, resolution));

const expandMethod = function (...args) { return expand(this, ...args); };
Shape$1.prototype.expand = expandMethod;

expand.signature = 'expand(shape:Shape, amount:number = 1, { resolution:number = 16 }) -> Shape';
expandMethod.signature = 'Shape -> expand(amount:number = 1, { resolution:number = 16 }) -> Shape';

/**
 *
 * # contract
 *
 * Moves the edges of the shape inward by the specified amount.
 *
 * ::: illustration { "view": { "position": [60, -60, 60], "target": [0, 0, 0] } }
 * ```
 * Cube(10).wireframe().with(Cube(10).contract(2))
 * ```
 * :::
 **/

const byRadius = (shape, amount = 1, { resolution = 16 } = {}) => expand(shape, -amount, resolution);

const contract = (...args) => byRadius(...args);

contract.byRadius = byRadius;

const contractMethod = function (radius, resolution) { return contract(this, radius, resolution); };
Shape$1.prototype.contract = contractMethod;

contract.signature = 'contract(shape:Shape, amount:number = 1, { resolution:number = 16 }) -> Shape';
contractMethod.signature = 'Shape -> contract(amount:number = 1, { resolution:number = 16 }) -> Shape';

const offset = (shape, radius = 1, resolution = 16) => outline$1(expand(shape, radius, resolution));

const offsetMethod = function (radius, resolution) { return offset(this, radius, resolution); };
Shape.prototype.offset = offsetMethod;

offset.signature = 'offset(shape:Shape, radius:number = 1, resolution:number = 16) -> Shape';
offsetMethod.signature = 'Shape -> offset(radius:number = 1, resolution:number = 16) -> Shape';

const api = {
  contract,
  expand,
  offset,
  shell
};

export default api;
export { contract, expand, offset, shell };
