import { toKeptGeometry, translate, getNonVoidPaths } from './jsxcad-geometry-tagged.js';
import { equals } from './jsxcad-math-vec3.js';
import { getEdges } from './jsxcad-geometry-path.js';

const X = 0;
const Y = 1;
const Z = 2;

// Zero work position machine
// G10 L20 P1 X0
// G10 L20 P1 Y0
// G10 L20 P1 Z0

const toGcode = async (
  geometry,
  {
    spindleSpeed = 0,
    doZero = true,
    topZ = 0,
    minCutZ = -1,
    cutDepth = 0.1,
    jumpHeight = 10,
    feedRate = 60 * 5,
  } = {}
) => {
  const jumpZ = topZ + jumpHeight;

  const codes = [];
  const _ = undefined;
  let position = [0, 0, 0];

  const emit = (code) => codes.push(code);

  const to = (
    x = position[X],
    y = position[Y],
    z = position[Z],
    g = 'G1',
    f = feedRate
  ) => {
    emit(
      `${g} X${x.toFixed(5)} Y${y.toFixed(5)} Z${z.toFixed(5)} F${f.toFixed(5)}`
    );
    position = [x, y, z];
  };

  // Runs each axis at maximum velocity until matches, so may make dog-legs.
  const rapid = (x, y, z) => to(x, y, z, 'G0');

  // Straight motion at set speed.
  const cut = (x, y, z) => {
    to(x, y, z, 'G1');
  };

  const spindleOn = () =>
    spindleSpeed > 0 ? emit(`M3 S${spindleSpeed.toFixed(5)}`) : emit(`M5`);
  const spindleOff = () => emit('M5');

  const jump = (x, y) => {
    rapid(_, _, jumpZ); // up
    rapid(x, y, jumpZ); // across
    rapid(x, y, topZ); // down
  };

  const home = () => {
    rapid(_, _, jumpZ); // up
    rapid(0, 0, jumpZ); // across
    rapid(0, 0, topZ); // home
  };

  if (doZero) {
    emit('G10 L20 P1 X0 Y0 Z0');
  }

  spindleOn();

  const keptGeometry = toKeptGeometry(
    translate([0, 0, -cutDepth], await geometry)
  );
  for (const { paths } of getNonVoidPaths(keptGeometry)) {
    for (const path of paths) {
      for (const [start, end] of getEdges(path)) {
        if (start[Z] < minCutZ) {
          throw Error(`Attempting to cut below minCutZ`);
        }
        if (!equals(start, position)) {
          jump(...start);
          cut(...start); // cut down
        }
        cut(...end); // cut across
      }
    }
  }
  home();

  spindleOff();

  codes.push(``);
  return new TextEncoder('utf8').encode(codes.join('\n'));
};

export { toGcode };
