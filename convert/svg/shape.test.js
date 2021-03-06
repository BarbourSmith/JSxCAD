import SvgShapes from 'svg-shapes';
import absolutifySvgPath from 'abs-svg-path';
import { boot } from '@jsxcad/sys';
import { canonicalize } from './canonicalize.js';
import curvifySvgPath from 'curvify-svg-path';
import parseSvgPath from 'parse-svg-path';
import test from 'ava';

test.beforeEach(async (t) => {
  await boot();
});

test('Circle as cubic bezier.', (t) => {
  const circlePath = SvgShapes.toPath(
    SvgShapes.getPoints('circle', { cx: 0, cy: 0, r: 1 })
  );
  const parsedCirclePath = parseSvgPath(circlePath);
  const absoluteCirclePath = absolutifySvgPath(parsedCirclePath);
  const curvifiedCirclePath = canonicalize(curvifySvgPath(absoluteCirclePath));
  t.deepEqual(curvifiedCirclePath, [
    ['M', 0, -1],
    ['C', -0.55228, -1, -1, -0.55228, -1, -0],
    ['C', -1, 0.55228, -0.55228, 1, -0, 1],
    ['C', 0.55228, 1, 1, 0.55228, 1, 0],
    ['C', 1, -0.55228, 0.55228, -1, 0, -1],
    ['C', 0, -1, 0, -1, 0, -1],
  ]);
});
