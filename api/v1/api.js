/**
 *
 * Defines the interface used by the api to access the rest of the system on
 * behalf of a user. e.g., algorithms and geometries.
 *
 * A user can destructively update this mapping in their code to change what
 * the api uses.
 */

export {
  source
} from './source';

export {
  X,
  Y,
  Z
} from '@jsxcad/api-v1-connector';

export {
  Shape,
  log
} from '@jsxcad/api-v1-shape';

export {
  pack
} from '@jsxcad/api-v1-layout';

export {
  Circle,
  Cone,
  Cube,
  Cylinder,
  Hexagon,
  Icosahedron,
  Line,
  Point,
  Points,
  Polygon,
  Polyhedron,
  Prism,
  Sphere,
  Square,
  Tetrahedron,
  Torus,
  Triangle,
  Wave
} from '@jsxcad/api-v1-shapes';

export {
  acos,
  cos,
  ease,
  max,
  min,
  numbers,
  sin,
  sqrt,
  vec
} from '@jsxcad/api-v1-math';

export {
  foot,
  inch,
  mm,
  mil,
  cm,
  m,
  thou,
  yard
} from '@jsxcad/api-v1-units';