import { pushWhenValid } from './pushWhenValid';
import test from 'ava';

test('bad', (t) => {
  const out = [];
  pushWhenValid(out, [
    [-84.82442949541505, -9.881966011250102, 0],
    [-84.82442604432079, -9.8819766326261, 0],
    [-71.8278661125526, -9.881920579617445, 0],
    [-71.82788384260306, -9.881866011250104, 0],
    [-84.82446198748129, -9.881866011250102, 0],
  ]);
  t.deepEqual(out, [
    [
      [-84.82442949541505, -9.881966011250102, 0],
      [-84.82442604432079, -9.8819766326261, 0],
      [-71.8278661125526, -9.881920579617445, 0],
      [-71.82788384260306, -9.881866011250104, 0],
      [-84.82446198748129, -9.881866011250102, 0],
    ],
  ]);
});
