import { Shape } from './Shape';
import { toSvg } from '@jsxcad/convert-svg';
import { writeFile } from '@jsxcad/sys';

export const writeSvg = async (options, shape) => {
  const { path } = options;
  const geometry = shape.toDisjointGeometry();
  return writeFile({ geometry, preview: true }, path, toSvg(options, geometry));
};

const method = function (options = {}) { writeSvg(options, this); return this; };

Shape.prototype.writeSvg = method;
