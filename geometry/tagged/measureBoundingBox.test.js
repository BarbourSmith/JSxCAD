import { measureBoundingBox } from './measureBoundingBox.js';
import test from 'ava';

test('Check points in group are measured.', (t) => {
  const geometry = {
    type: 'group',
    content: [
      { type: 'points', points: [[0, 0, 0]] },
      { type: 'points', points: [[100, 0, 0]] },
      { type: 'points', points: [[0, 100, 0]] },
    ],
  };
  const box = measureBoundingBox(geometry);

  t.deepEqual(box, [
    [0, 0, 0],
    [100, 100, 0],
  ]);
});
