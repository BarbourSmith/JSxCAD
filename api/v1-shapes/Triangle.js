import { Shape, shapeMethod } from '@jsxcad/api-v1-shape';

import { Arc } from './Arc.js';
import { orRadius } from './orRadius.js';

export const Triangle = (plan = 1) => Arc({ ...orRadius(plan), sides: 3 });

Shape.prototype.Triangle = shapeMethod(Triangle);

export default Triangle;
