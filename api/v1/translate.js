import { Assembly } from './Assembly';
import { Paths } from './Paths';
import { Solid } from './Solid';
import { Z0Surface } from './Z0Surface';

import { fromTranslation } from '@jsxcad/math-mat4';

export const translate = ([x = 0, y = 0, z = 0], shape) => {
  return shape.transform(fromTranslation([x, y, z]));
};

const method = function (vector) {
  return translate(vector, this);
};

Assembly.prototype.translate = method;
Paths.prototype.translate = method;
Solid.prototype.translate = method;
Z0Surface.prototype.translate = method;
