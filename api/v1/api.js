/**
 *
 * Defines the interface used by the api to access the rest of the system on
 * behalf of a user. e.g., algorithms and geometries.
 *
 * A user can destructively update this mapping in their code to change what
 * the api uses.
 */

import '@jsxcad/api-v1-deform';
import '@jsxcad/api-v1-layout';
import '@jsxcad/api-v1-pdf';
import '@jsxcad/api-v1-shell';
import '@jsxcad/api-v1-svg';
import '@jsxcad/api-v1-stl';

export { Page, pack } from '@jsxcad/api-v1-layout';

export { md } from './md.js';

export { source } from './source.js';

export { emit, read, write } from '@jsxcad/sys';

export { Connector, X, Y, Z } from '@jsxcad/api-v1-connector';

export { ChainedHull, Hull, Loop } from '@jsxcad/api-v1-extrude';

export { Shape, log, make } from '@jsxcad/api-v1-shape';

export { Line2 } from '@jsxcad/api-v1-line2';

export { Plan } from '@jsxcad/api-v1-plan';

export {
  Arc,
  Assembly,
  Circle,
  Cone,
  Cube,
  Cylinder,
  Difference,
  Empty,
  Hexagon,
  Icosahedron,
  Intersection,
  Layers,
  Line,
  Path,
  Point,
  Points,
  Polygon,
  Polyhedron,
  Prism,
  Sphere,
  Spiral,
  Square,
  Tetrahedron,
  Torus,
  Triangle,
  Union,
  Void,
  Wave,
} from '@jsxcad/api-v1-shapes';

export { Item } from '@jsxcad/api-v1-item';

export {
  Noise,
  Random,
  acos,
  cos,
  ease,
  max,
  min,
  numbers,
  sin,
  sqrt,
  vec,
} from '@jsxcad/api-v1-math';

export { foot, inch, mm, mil, cm, m, thou, yard } from '@jsxcad/api-v1-units';
