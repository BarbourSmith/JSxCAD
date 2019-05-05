import { Shape } from './Shape';
import { toStl } from '@jsxcad/convert-stl';
import { writeFile } from '@jsxcad/sys';

export const writeStl = async (options, shape) => {
  const { path } = options;
  const geometry = shape.toDisjointGeometry();
  return writeFile({ geometry }, path, toStl(options, geometry));
};

const method = function (options = {}) { writeStl(options, this); return this; };

Shape.prototype.writeStl = method;
