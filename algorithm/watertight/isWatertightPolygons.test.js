import { isWatertightPolygons } from './isWatertightPolygons';
import { test } from 'ava';

test('Leaky polygon array is not watertight', t => {
  const leaky = [[[-5, -5, -5], [-5, -5, 5], [-5, 5, 5], [-5, 5, -5]],
                 [[-5, -5, -5], [5, -5, -5], [5, -5, 5], [-5, -5, 5]],
                 [[-5, -5, -5], [-5, 5, -5], [5, 5, -5], [5, -5, -5]],
                 [[5, 5, -5], [5, 5, 0], [5, -5, 0], [5, -5, -5]],
                 [[5, 0, 0], [5, 0, 5], [5, -5, 5], [5, -5, 0]],
                 [[0, 5, 5], [0, 5, 0], [-5, 5, 0], [-5, 5, 5]],
                 [[5, 5, 0], [5, 5, -5], [-5, 5, -5], [-5, 5, 0]],
                 [[5, -5, 5], [5, 0, 5], [-5, 0, 5], [-5, -5, 5]],
                 [[0, 0, 5], [0, 5, 5], [-5, 5, 5], [-5, 0, 5]],
                 [[10, 0, 0], [10, 10, 0], [10, 10, 10], [10, 0, 10]],
                 [[0, 10, 0], [0, 10, 10], [10, 10, 10], [10, 10, 0]],
                 [[0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]],
                 [[0, 10, 10], [0, 10, 5], [0, 0, 5], [0, 0, 10]],
                 [[0, 10, 5], [0, 10, 0], [0, 5, 0], [0, 5, 5]],
                 [[10, 0, 0], [10, 0, 5], [5, 0, 5], [5, 0, 0]],
                 [[10, 0, 5], [10, 0, 10], [0, 0, 10], [0, 0, 5]],
                 [[10, 10, 0], [10, 5, 0], [0, 5, 0], [0, 10, 0]],
                 [[10, 5, 0], [10, 0, 0], [5, 0, 0], [5, 5, 0]]];
  t.false(isWatertightPolygons(leaky));
});

test('Degenerate polygon array is watertight', t => {
  // This one is accepted by slic3r, but FreeCad reports a degenerate face.
  // But it doesn't look like it's not watertight.
  // TODO: Look further into degenerate faces.
  const degenerate = [[[-5, -5, -5], [-5, -5, 5], [-5, 0, 5], [-5, 5, 5], [-5, 5, 0], [-5, 5, -5]],
                      [[-5, -5, -5], [5, -5, -5], [5, -5, 0], [5, -5, 5], [-5, -5, 5]],
                      [[-5, -5, -5], [-5, 5, -5], [5, 5, -5], [5, -5, -5]],
                      [[5, 5, -5], [5, 5, 0], [5, 0, 0], [5, -5, 0], [5, -5, -5]],
                      [[5, 0, 0], [5, 0, 5], [5, -5, 5], [5, -5, 0]],
                      [[0, 5, 5], [0, 5, 0], [-5, 5, 0], [-5, 5, 5]],
                      [[0, 5, 0], [5, 5, 0], [5, 5, -5], [-5, 5, -5], [-5, 5, 0]],
                      [[5, -5, 5], [5, 0, 5], [0, 0, 5], [-5, 0, 5], [-5, -5, 5]],
                      [[0, 0, 5], [0, 5, 5], [-5, 5, 5], [-5, 0, 5]],
                      [[10, 0, 5], [10, 0, 0], [10, 5, 0], [10, 10, 0], [10, 10, 10], [10, 0, 10]],
                      [[0, 10, 0], [0, 10, 5], [0, 10, 10], [10, 10, 10], [10, 10, 0]],
                      [[0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]],
                      [[0, 10, 10], [0, 10, 5], [0, 5, 5], [0, 0, 5], [0, 0, 10]],
                      [[0, 10, 5], [0, 10, 0], [0, 5, 0], [0, 5, 5]],
                      [[10, 0, 0], [10, 0, 5], [5, 0, 5], [5, 0, 0]],
                      [[5, 0, 5], [10, 0, 5], [10, 0, 10], [0, 0, 10], [0, 0, 5]],
                      [[10, 10, 0], [10, 5, 0], [5, 5, 0], [0, 5, 0], [0, 10, 0]],
                      [[10, 5, 0], [10, 0, 0], [5, 0, 0], [5, 5, 0]]];
  t.true(isWatertightPolygons(degenerate));
});

test('Fixed Degenerate polygon array is watertight', t => {
  const fixedDegenerate =
        [// This looks like the correct edge.
          [[-5, -5, -5], [-5, -5, 5], [-5, 0, 5], [-5, 5, 5], [-5, 5, 0], [-5, 5, -5]],
          [[-5, -5, -5], [5, -5, -5], [5, -5, 0], [5, -5, 5], [-5, -5, 5]],
          [[-5, -5, -5], [-5, 5, -5], [5, 5, -5], [5, -5, -5]], //
          [[5, 5, -5], [5, 5, 0], [5, 0, 0], [5, -5, 0], [5, -5, -5]],
          [[5, 0, 0], [5, 0, 5], [5, -5, 5], [5, -5, 0]],
          [[0, 5, 5], [0, 5, 0], [-5, 5, 0], [-5, 5, 5]],
          [[0, 5, 0], [5, 5, 0], [5, 5, -5], [-5, 5, -5], [-5, 5, 0]], // This looks like the correct matching edge.
          [[5, -5, 5], [5, 0, 5], [0, 0, 5], [-5, 0, 5], [-5, -5, 5]],
          [[0, 0, 5], [0, 5, 5], [-5, 5, 5], [-5, 0, 5]],
          [[10, 0, 5], [10, 0, 0], [10, 5, 0], [10, 10, 0], [10, 10, 10], [10, 0, 10]],
          [[0, 10, 0], [0, 10, 5], [10, 10, 0]], // fragment
          [[0, 10, 5], [0, 10, 10], [10, 10, 10], [10, 10, 0]], // this large face has an edge
          [[0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]],
          [[0, 10, 10], [0, 10, 5], [0, 5, 5], [0, 0, 5], [0, 0, 10]], // that should be split by this one
          [[0, 10, 5], [0, 10, 0], [0, 5, 0], [0, 5, 5]], // and this one, buts form a T that wasn't closed
          [[10, 0, 0], [10, 0, 5], [5, 0, 5], [5, 0, 0]],
          [[5, 0, 5], [10, 0, 5], [10, 0, 10], [0, 0, 10], [0, 0, 5]],
          [[10, 10, 0], [10, 5, 0], [5, 5, 0], [0, 5, 0], [0, 10, 0]],
          [[10, 5, 0], [10, 0, 0], [5, 0, 0], [5, 5, 0]]];
  t.true(isWatertightPolygons(fixedDegenerate));
});

test('Fixed box1-union-box4 test case watertight.', t => {
  const v1Output = [[[-5, -5, -5], [-5, -5, 5], [-5, 5, 5], [-5, 5, -5]],
                    [[-5, -5, -5], [5, -5, -5], [5, -5, 5], [0, -5, 5], [0, 0, 5], [-5, -5, 5]],
                    [[-5, -5, -5], [-5, 5, -5], [0, 5, -5], [5, 5, -5], [5, 0, -5], [5, -5, -5]], // -5,5,-5 (this one)
                    [[5, -5, -5], [5, 0, -5], [5, 0, 5], [5, -5, 5]],
                    [[-5, 5, -5], [-5, 5, 5], [0, 5, 5], [0, 5, -5]],
                    [[-5, -5, 5], [0, -5, 5], [0, 5, 5], [-5, 5, 5]],
                    [[5, 0, -5], [5, 5, -5], [5, 5, 0], [5, 0, 0]],
                    [[5, 5, 0], [5, 5, -5], [0, 5, -5], [0, 5, 0]],
                    [[0, -5, 5], [5, -5, 5], [5, 0, 5], [0, 0, 5]],
                    [[10, 0, 0], [10, 10, 0], [10, 10, 10], [10, 0, 10]],
                    [[0, 10, 0], [0, 10, 10], [10, 10, 10], [10, 10, 0]],
                    [[0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]],
                    [[0, 5, 10], [0, 10, 10], [0, 10, 0], [0, 5, 0]],
                    [[5, 0, 0], [10, 0, 0], [10, 0, 10], [5, 0, 10]],
                    [[5, 10, 0], [10, 10, 0], [10, 0, 0], [5, 0, 0]],
                    [[0, 0, 5], [0, 0, 10], [0, 5, 10], [0, 5, 5]],
                    [[5, 0, 5], [5, 0, 10], [0, 0, 10], [0, 0, 5]],
                    [[0, 5, 0], [0, 10, 0], [5, 10, 0], [5, 5, 0]]];
  // FIXME: Prove this correct.
  t.false(isWatertightPolygons(v1Output));
});

test('Makes box1-union-box4 test case watertight.', t => {
  const v1Output = [[[-5, -5, -5], [-5, -5, 5], [-5, 5, 5], [-5, 5, -5]], // -5,5,-5 (not this one)
                    [[-5, -5, -5], [5, -5, -5], [5, -5, 5], [-5, -5, 5]],
                    [[-5, -5, -5], [-5, 5, -5], [5, 5, -5], [5, -5, -5]], // -5,5,-5 (this one)
                    [[5, -5, -5], [5, 0, -5], [5, 0, 5], [5, -5, 5]],
                    [[-5, 5, -5], [-5, 5, 5], [0, 5, 5], [0, 5, -5]], // -5,5,-5
                    [[-5, -5, 5], [0, -5, 5], [0, 5, 5], [-5, 5, 5]],
                    [[5, 0, -5], [5, 5, -5], [5, 5, 0], [5, 0, 0]],
                    [[5, 5, 0], [5, 5, -5], [0, 5, -5], [0, 5, 0]],
                    [[0, -5, 5], [5, -5, 5], [5, 0, 5], [0, 0, 5]],
                    [[10, 0, 0], [10, 10, 0], [10, 10, 10], [10, 0, 10]],
                    [[0, 10, 0], [0, 10, 10], [10, 10, 10], [10, 10, 0]],
                    [[0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]],
                    [[0, 5, 10], [0, 10, 10], [0, 10, 0], [0, 5, 0]],
                    [[5, 0, 0], [10, 0, 0], [10, 0, 10], [5, 0, 10]],
                    [[5, 10, 0], [10, 10, 0], [10, 0, 0], [5, 0, 0]],
                    [[0, 0, 5], [0, 0, 10], [0, 5, 10], [0, 5, 5]],
                    [[5, 0, 5], [5, 0, 10], [0, 0, 10], [0, 0, 5]],
                    [[0, 5, 0], [0, 10, 0], [5, 10, 0], [5, 5, 0]]];
  // FIXME: Prove this correct.
  t.false(isWatertightPolygons(v1Output));
});
