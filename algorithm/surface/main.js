import { canonicalize, rotateZ, scale, toPlane, transform } from './ops';

import { assertCoplanar } from './assertCoplanar';
import { eachPoint } from './eachPoint';
import { flip } from './flip';
import { makeConvex } from './makeConvex';
import { makeSimple } from './makeSimple';
import { measureArea } from './measureArea';
import { toGeneric } from './toGeneric';

export {
  assertCoplanar,
  canonicalize,
  eachPoint,
  flip,
  makeConvex,
  makeSimple,
  measureArea,
  rotateZ,
  toGeneric,
  toPlane,
  transform,
  scale
};
