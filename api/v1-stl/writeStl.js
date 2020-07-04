import { addPending, emit, writeFile } from '@jsxcad/sys';

import { Shape } from '@jsxcad/api-v1-shape';
import { toStl as convertToStl } from '@jsxcad/convert-stl';
import { ensurePages } from '@jsxcad/api-v1-layout';

/**
 *
 * # Write STL
 *
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * await Cube().writeStl('cube.stl');
 * await readStl({ path: 'cube.stl' });
 * ```
 * :::
 *
 **/

export const prepareStl = (shape, name, options = {}) => {
  // CHECK: Should this be limited to Page plans?
  let index = 0;
  const entries = [];
  for (const entry of ensurePages(shape.toKeptGeometry())) {
    const op = convertToStl(entry, options);
    addPending(op);
    entries.push({
      data: op,
      filename: `${name}_${index++}.stl`,
      type: 'application/sla',
    });
  }
  return entries;
};

const downloadStlMethod = function (...args) {
  const entries = prepareStl(this, ...args);
  emit({ download: { entries } });
  return this;
};
Shape.prototype.downloadStl = downloadStlMethod;

export const writeStl = async (shape, name, options = {}) => {
  for (const { data, filename } of prepareStl(shape, name, {})) {
    await writeFile({ doSerialize: false }, `output/${filename}`, data);
  }
};

const method = function (...args) {
  return writeStl(this, ...args);
};
Shape.prototype.writeStl = method;

export default writeStl;
