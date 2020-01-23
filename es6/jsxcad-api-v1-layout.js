import Shape from './jsxcad-api-v1-shape.js';
import { getLeafs } from './jsxcad-geometry-tagged.js';
import { pack as pack$1 } from './jsxcad-algorithm-pack.js';

const pack = (shape, { size = [210, 297], pageMargin = 5, itemMargin = 1, perLayout = Infinity }) => {
  if (perLayout === 0) {
    // Packing was disabled -- do nothing.
    return shape;
  }

  let todo = [];
  for (const leaf of getLeafs(shape.toKeptGeometry())) {
    todo.push(leaf);
  }
  const packedLayers = [];
  while (true) {
    const [packed, unpacked] = pack$1({ size, pageMargin, itemMargin }, ...todo.slice(0, perLayout));
    if (packed.length === 0) {
      break;
    } else {
      packedLayers.push({ item: { disjointAssembly: packed } });
    }
    if (unpacked.length === 0) {
      break;
    }
    todo = unpacked;
  }
  if (packedLayers.length === 1) {
    // This is a reasonably common case.
    return Shape.fromGeometry(packedLayers[0]);
  } else {
    return Shape.fromGeometry({ layers: packedLayers });
  }
};

const packMethod = function (...args) { return pack(this, ...args); };
Shape.prototype.pack = packMethod;

pack.signature = 'pack({ size, margin = 5 }, ...shapes:Shape) -> [packed:Shapes, unpacked:Shapes]';

const api = {
  pack
};

export default api;
export { pack };
