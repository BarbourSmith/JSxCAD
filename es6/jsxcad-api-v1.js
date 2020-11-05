import { addPending, write, emit, read, getCurrentPath, addSource, addOnEmitHandler, pushModule, popModule } from './jsxcad-sys.js';
export { emit, read, write } from './jsxcad-sys.js';
import Shape, { Shape as Shape$1, loadGeometry, log, saveGeometry } from './jsxcad-api-v1-shape.js';
export { Shape, loadGeometry, log, saveGeometry } from './jsxcad-api-v1-shape.js';
import { ensurePages, Page, pack } from './jsxcad-api-v1-layout.js';
export { Page, pack } from './jsxcad-api-v1-layout.js';
import { hash } from './jsxcad-geometry-tagged.js';
import './jsxcad-api-v1-deform.js';
import './jsxcad-api-v1-gcode.js';
import './jsxcad-api-v1-pdf.js';
import './jsxcad-api-v1-plans.js';
import { apothem, box, cylinder, diameter, radius } from './jsxcad-geometry-plan.js';
export { apothem, box, cylinder, diameter, radius } from './jsxcad-geometry-plan.js';
import { Peg, Arc, Assembly, Ball, BallOfApothem, BallOfDiameter, BallOfRadius, Box, BoxOfApothem, BoxOfCorners, BoxOfDiameter, BoxOfEdge, BoxOfRadius, BoxOfSize, Circle, Cone, Difference, Empty, Group, Hershey, Hexagon, Icosahedron, Intersection, Line, Path, Plane, Point, Points, Polygon, Polyhedron, Prism, Rod, RodOfApothem, RodOfDiameter, RodOfFunction, RodOfRadius, RodOfSlices, Spiral, Square, Tetrahedron, Toolpath, Torus, Triangle, Union, Wave } from './jsxcad-api-v1-shapes.js';
export { Arc, Assembly, Ball, BallOfApothem, BallOfDiameter, BallOfRadius, Box, BoxOfApothem, BoxOfCorners, BoxOfDiameter, BoxOfEdge, BoxOfRadius, BoxOfSize, Circle, Cone, Difference, Empty, Group, Hershey, Hexagon, Icosahedron, Intersection, Line, Path, Peg, Plane, Point, Points, Polygon, Polyhedron, Prism, Rod, RodOfApothem, RodOfDiameter, RodOfFunction, RodOfRadius, RodOfSlices, Spiral, Square, Tetrahedron, Toolpath, Torus, Triangle, Union, Wave } from './jsxcad-api-v1-shapes.js';
import { X, Y, Z } from './jsxcad-api-v1-connector.js';
export { X, Y, Z } from './jsxcad-api-v1-connector.js';
import { ChainedHull, Hull, Loop } from './jsxcad-api-v1-extrude.js';
export { ChainedHull, Hull, Loop } from './jsxcad-api-v1-extrude.js';
import { Line2 } from './jsxcad-api-v1-line2.js';
export { Line2 } from './jsxcad-api-v1-line2.js';
import { Plan } from './jsxcad-api-v1-plan.js';
export { Plan } from './jsxcad-api-v1-plan.js';
import { Shell } from './jsxcad-api-v1-shell.js';
export { Shell } from './jsxcad-api-v1-shell.js';
import { BenchPlane, BenchSaw, DrillPress, HoleRouter, LineRouter, ProfileRouter } from './jsxcad-api-v1-tools.js';
export { BenchPlane, BenchSaw, DrillPress, HoleRouter, LineRouter, ProfileRouter } from './jsxcad-api-v1-tools.js';
import { Item } from './jsxcad-api-v1-item.js';
export { Item } from './jsxcad-api-v1-item.js';
import { Noise, Random, acos, cos, ease, max, min, numbers, sin, sqrt, vec } from './jsxcad-api-v1-math.js';
export { Noise, Random, acos, cos, ease, max, min, numbers, sin, sqrt, vec } from './jsxcad-api-v1-math.js';
import { readSvg } from './jsxcad-api-v1-svg.js';
export { readSvg } from './jsxcad-api-v1-svg.js';
import { readStl } from './jsxcad-api-v1-stl.js';
export { readStl } from './jsxcad-api-v1-stl.js';
import { foot, inch, mm, mil, cm, m, thou, yard } from './jsxcad-api-v1-units.js';
export { cm, foot, inch, m, mil, mm, thou, yard } from './jsxcad-api-v1-units.js';
import { toEcmascript } from './jsxcad-compiler.js';
import { toSvg } from './jsxcad-convert-svg.js';

// FIX: Avoid the extra read-write cycle.
const view = (
  shape,
  inline,
  { path, width = 1024, height = 512, position = [100, -100, 100] } = {}
) => {
  let nth = 0;
  const hash$1 = hash(shape.toGeometry());
  for (const entry of ensurePages(shape.toDisjointGeometry())) {
    if (path) {
      const nthPath = `${path}_${nth++}`;
      addPending(write(nthPath, entry));
      const view = {
        width,
        height,
        position,
        path: nthPath,
        inline,
      };
      emit({ view, hash: hash$1 + nth });
    } else {
      const view = {
        width,
        height,
        position,
        geometry: entry,
        inline,
      };
      emit({ view, hash: hash$1 + nth });
    }
  }
  return shape;
};

Shape.prototype.view = function (
  inline,
  { path, width = 1024, height = 512, position = [100, -100, 100] } = {}
) {
  return view(this, inline, { path, width, height, position });
};

Shape.prototype.topView = function (
  inline,
  { path, width = 1024, height = 512, position = [0, 0, 100] } = {}
) {
  return view(this, inline, { path, width, height, position });
};

Shape.prototype.frontView = function (
  inline,
  { path, width = 1024, height = 512, position = [0, -100, 0] } = {}
) {
  return view(this, inline, { path, width, height, position });
};

Shape.prototype.sideView = function (
  inline,
  { path, width = 1024, height = 512, position = [100, 0, 0] } = {}
) {
  return view(this, inline, { path, width, height, position });
};

function pad (hash, len) {
  while (hash.length < len) {
    hash = '0' + hash;
  }
  return hash;
}

function fold (hash, text) {
  var i;
  var chr;
  var len;
  if (text.length === 0) {
    return hash;
  }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash < 0 ? hash * -2 : hash;
}

function foldObject (hash, o, seen) {
  return Object.keys(o).sort().reduce(foldKey, hash);
  function foldKey (hash, key) {
    return foldValue(hash, o[key], key, seen);
  }
}

function foldValue (input, value, key, seen) {
  var hash = fold(fold(fold(input, key), toString(value)), typeof value);
  if (value === null) {
    return fold(hash, 'null');
  }
  if (value === undefined) {
    return fold(hash, 'undefined');
  }
  if (typeof value === 'object' || typeof value === 'function') {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, '[Circular]' + key);
    }
    seen.push(value);

    var objHash = foldObject(hash, value, seen);

    if (!('valueOf' in value) || typeof value.valueOf !== 'function') {
      return objHash;
    }

    try {
      return fold(objHash, String(value.valueOf()))
    } catch (err) {
      return fold(objHash, '[valueOf exception]' + (err.stack || err.message))
    }
  }
  return fold(hash, value.toString());
}

function toString (o) {
  return Object.prototype.toString.call(o);
}

function sum (o) {
  return pad(foldValue(0, o, '', []).toString(16), 8);
}

var hashSum = sum;

const md = (strings, ...placeholders) => {
  const md = strings.reduce(
    (result, string, i) => result + placeholders[i - 1] + string
  );
  emit({ md, hash: hashSum(md) });
  return md;
};

// FIX: This needs to consider the current module.
// FIX: Needs to communicate cache invalidation with other workers.
const getControlValues = async () =>
  (await read(`control/${getCurrentPath()}`, { useCache: false })) || {};

const stringBox = async (label, otherwise) => {
  const { [label]: value = otherwise } = await getControlValues();
  emit({ control: { type: 'stringBox', label, value } });
  return value;
};

const numberBox = async (label, otherwise) =>
  Number(await stringBox(label, otherwise));

const sliderBox = async (
  label,
  otherwise,
  { min = 0, max = 100, step = 1 } = {}
) => {
  const { [label]: value = otherwise } = await getControlValues();
  const control = {
    control: { type: 'sliderBox', label, value, min, max, step },
  };
  const hash = hashSum(control);
  emit({ control, hash });
  return Number(value);
};

const checkBox = async (label, otherwise) => {
  const { [label]: value = otherwise } = await getControlValues();
  const control = { type: 'checkBox', label, value };
  const hash = hashSum(control);
  emit({ control, hash });
  return Boolean(value);
};

const selectBox = async (label, otherwise, options) => {
  const { [label]: value = otherwise } = await getControlValues();
  const control = { type: 'selectBox', label, value, options };
  const hash = hashSum(control);
  emit({ control, hash });
  return value;
};

const source = (path, source) => addSource(`cache/${path}`, source);

const notes = [];

let replaying = false;
let handler;

const recordNote = (note, index) => {
  if (!replaying) {
    notes.push({ note, index });
  }
};

const beginRecordingNotes = () => {
  if (handler === undefined) {
    handler = addOnEmitHandler(recordNote);
  }
  notes.length = 0;
};

const saveRecordedNotes = async (path) => {
  await write(path, notes);
};

const replayRecordedNotes = async (path) => {
  try {
    replaying = true;
    const notes = await read(path);
    if (notes === undefined) {
      return;
    }
    if (notes.length === 0) {
      return;
    }
    for (const { note } of notes) {
      emit(note);
    }
  } finally {
    replaying = false;
  }
};

/**
 *
 * Defines the interface used by the api to access the rest of the system on
 * behalf of a user. e.g., algorithms and geometries.
 *
 * A user can destructively update this mapping in their code to change what
 * the api uses.
 */

const a = apothem;
const b = box;
const c = cylinder;
const d = diameter;
const r = radius;

const x = Peg([0, 0, 0], [0, 0, 1], [0, -1, 0]);
const y = Peg([0, 0, 0], [0, 0, 1], [1, 0, 0]);
const z = Peg([0, 0, 0], [0, 1, 0], [-1, 0, 0]);

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  apothem: apothem,
  cylinder: cylinder,
  box: box,
  diameter: diameter,
  radius: radius,
  a: a,
  b: b,
  c: c,
  d: d,
  r: r,
  x: x,
  y: y,
  z: z,
  Page: Page,
  pack: pack,
  md: md,
  checkBox: checkBox,
  numberBox: numberBox,
  selectBox: selectBox,
  sliderBox: sliderBox,
  stringBox: stringBox,
  source: source,
  emit: emit,
  read: read,
  write: write,
  beginRecordingNotes: beginRecordingNotes,
  replayRecordedNotes: replayRecordedNotes,
  saveRecordedNotes: saveRecordedNotes,
  X: X,
  Y: Y,
  Z: Z,
  ChainedHull: ChainedHull,
  Hull: Hull,
  Loop: Loop,
  Shape: Shape$1,
  loadGeometry: loadGeometry,
  log: log,
  saveGeometry: saveGeometry,
  Line2: Line2,
  Plan: Plan,
  Shell: Shell,
  BenchPlane: BenchPlane,
  BenchSaw: BenchSaw,
  DrillPress: DrillPress,
  HoleRouter: HoleRouter,
  LineRouter: LineRouter,
  ProfileRouter: ProfileRouter,
  Arc: Arc,
  Assembly: Assembly,
  Ball: Ball,
  BallOfApothem: BallOfApothem,
  BallOfDiameter: BallOfDiameter,
  BallOfRadius: BallOfRadius,
  Box: Box,
  BoxOfApothem: BoxOfApothem,
  BoxOfCorners: BoxOfCorners,
  BoxOfDiameter: BoxOfDiameter,
  BoxOfEdge: BoxOfEdge,
  BoxOfRadius: BoxOfRadius,
  BoxOfSize: BoxOfSize,
  Circle: Circle,
  Cone: Cone,
  Difference: Difference,
  Empty: Empty,
  Group: Group,
  Hershey: Hershey,
  Hexagon: Hexagon,
  Icosahedron: Icosahedron,
  Intersection: Intersection,
  Line: Line,
  Path: Path,
  Peg: Peg,
  Plane: Plane,
  Point: Point,
  Points: Points,
  Polygon: Polygon,
  Polyhedron: Polyhedron,
  Prism: Prism,
  Rod: Rod,
  RodOfApothem: RodOfApothem,
  RodOfDiameter: RodOfDiameter,
  RodOfFunction: RodOfFunction,
  RodOfRadius: RodOfRadius,
  RodOfSlices: RodOfSlices,
  Spiral: Spiral,
  Square: Square,
  Tetrahedron: Tetrahedron,
  Toolpath: Toolpath,
  Torus: Torus,
  Triangle: Triangle,
  Union: Union,
  Wave: Wave,
  Item: Item,
  Noise: Noise,
  Random: Random,
  acos: acos,
  cos: cos,
  ease: ease,
  max: max,
  min: min,
  numbers: numbers,
  sin: sin,
  sqrt: sqrt,
  vec: vec,
  readSvg: readSvg,
  readStl: readStl,
  foot: foot,
  inch: inch,
  mm: mm,
  mil: mil,
  cm: cm,
  m: m,
  thou: thou,
  yard: yard
});

const DYNAMIC_MODULES = new Map();

const registerDynamicModule = (bare, path) =>
  DYNAMIC_MODULES.set(bare, path);

const buildImportModule = (api) => async (name) => {
  const internalModule = DYNAMIC_MODULES.get(name);
  if (internalModule !== undefined) {
    const module = await import(internalModule);
    return module;
  }
  let script;
  if (script === undefined) {
    const path = `source/${name}`;
    const sources = [];
    sources.push(name);
    script = await read(path, { sources });
  }
  if (script === undefined) {
    throw Error(`Cannot import module ${name}`);
  }
  const scriptText =
    typeof script === 'string'
      ? script
      : new TextDecoder('utf8').decode(script);
  const ecmascript = await toEcmascript(scriptText, { path: name });
  const builder = new Function(
    `{ ${Object.keys(api).join(', ')} }`,
    `return async () => { ${ecmascript} };`
  );
  const module = await builder(api);
  try {
    pushModule(name);
    const exports = await module();
    return exports;
  } finally {
    popModule();
  }
};

const extendedApi = { ...api, toSvg };

const importModule = buildImportModule(extendedApi);

extendedApi.importModule = importModule;

// Register Dynamic libraries.

const module = (name) => `@jsxcad/api-v1-${name}`;

registerDynamicModule(module('armature'), './jsxcad-api-v1-armature.js');
registerDynamicModule(module('connector'), './jsxcad-api-v1-connector.js');
registerDynamicModule(module('cursor'), './jsxcad-api-v1-cursor.js');
registerDynamicModule(module('deform'), './jsxcad-api-v1-deform.js');
registerDynamicModule(module('dst'), './jsxcad-api-v1-dst.js');
registerDynamicModule(module('dxf'), './jsxcad-api-v1-dxf.js');
registerDynamicModule(module('extrude'), './jsxcad-api-v1-extrude.js');
registerDynamicModule(module('font'), './jsxcad-api-v1-font.js');
registerDynamicModule(module('gcode'), './jsxcad-api-v1-gcode.js');
registerDynamicModule(module('item'), './jsxcad-api-v1-item.js');
registerDynamicModule(module('layout'), './jsxcad-api-v1-layout.js');
registerDynamicModule(module('math'), './jsxcad-api-v1-math.js');
registerDynamicModule(module('pdf'), './jsxcad-api-v1-pdf.js');
registerDynamicModule(module('plan'), './jsxcad-api-v1-plan.js');
registerDynamicModule(module('plans'), './jsxcad-api-v1-plans.js');
registerDynamicModule(module('png'), './jsxcad-api-v1-png.js');
registerDynamicModule(module('shape'), './jsxcad-api-v1-shape.js');
registerDynamicModule(module('shapefile'), './jsxcad-api-v1-shapefile.js');
registerDynamicModule(module('shapes'), './jsxcad-api-v1-shapes.js');
registerDynamicModule(module('shell'), './jsxcad-api-v1-shell.js');
registerDynamicModule(module('stl'), './jsxcad-api-v1-stl.js');
registerDynamicModule(module('svg'), './jsxcad-api-v1-svg.js');
registerDynamicModule(module('threejs'), './jsxcad-api-v1-threejs.js');
registerDynamicModule(module('units'), './jsxcad-api-v1-units.js');

export { a, b, beginRecordingNotes, c, checkBox, d, importModule, md, numberBox, r, replayRecordedNotes, saveRecordedNotes, selectBox, sliderBox, source, stringBox, x, y, z };
