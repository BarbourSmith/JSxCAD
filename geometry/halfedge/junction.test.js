import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import { junctionSelector } from './junction';
import test from 'ava';

const solid = [
  [
    [
      [0.05999999999999972, 0.5, 0.05999999999999961],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [0.059999999999999776, 0.5, 0.5],
    ],
    [
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [0.05999999999999972, 0.5, 0.05999999999999961],
      [0.05999999999999972, 0.5, -0.5],
    ],
    [
      [0.5100000000000001, 0.5000000000000001, 0.5],
      [0.5100000000000001, 0.5000000000000001, -0.05999999999999994],
      [0.5000000000000001, 0.5000000000000001, -0.06999999999999995],
      [0.5000000000000001, 0.5, 0.5],
    ],
    [
      [0.5100000000000001, 0.5000000000000001, -0.5],
      [0.5000000000000001, 0.5, -0.5],
      [0.5000000000000001, 0.5000000000000001, -0.06999999999999995],
      [0.5100000000000001, 0.5000000000000001, -0.05999999999999994],
    ],
    [
      [1.07, 0.5, 0.5],
      [0.5100000000000001, 0.5000000000000001, -0.05999999999999994],
      [0.5100000000000001, 0.5000000000000001, 0.5],
    ],
    [
      [0.5100000000000001, 0.5000000000000001, -0.05999999999999994],
      [1.07, 0.5, 0.5],
      [1.07, 0.5, -0.5],
      [0.5100000000000001, 0.5000000000000001, -0.5],
    ],
    [
      [0.059999999999999776, 0.5, 0.5],
      [0.07, 0.5000000000000001, 0.5],
      [0.06999999999999995, 0.5, 0.06999999999999984],
      [0.05999999999999972, 0.5, 0.05999999999999961],
    ],
    [
      [0.05999999999999972, 0.5, -0.5],
      [0.05999999999999972, 0.5, 0.05999999999999961],
      [0.06999999999999995, 0.5, 0.06999999999999984],
      [0.07, 0.5000000000000001, -0.5],
    ],
    [
      [0.07, 0.5000000000000001, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [0.06999999999999995, 0.5, 0.06999999999999984],
    ],
    [
      [0.06999999999999995, 0.5, 0.06999999999999984],
      [0.5000000000000001, 0.5, 0.5],
      [0.5000000000000001, 0.5, -0.5],
      [0.07, 0.5000000000000001, -0.5],
    ],
  ],
  [
    [
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [0.059999999999999776, -0.05999999999999994, 0.5],
      [0.059999999999999776, 0.5, 0.5],
    ],
    [
      [0.059999999999999776, -0.05999999999999994, 0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [0.05999999999999972, -0.5000000000000001, 0.5],
    ],
    [
      [0.5100000000000001, 0.5000000000000001, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [0.5, 0.06999999999999984, 0.5],
      [0.5100000000000001, 0.059999999999999665, 0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, 0.5],
      [0.5100000000000001, 0.059999999999999665, 0.5],
      [0.5, 0.06999999999999984, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
    ],
    [
      [0.5100000000000001, 0.059999999999999665, 0.5],
      [1.0699999999999998, -0.5000000000000002, 0.5],
      [1.07, 0.5, 0.5],
      [0.5100000000000001, 0.5000000000000001, 0.5],
    ],
    [
      [1.0699999999999998, -0.5000000000000002, 0.5],
      [0.5100000000000001, 0.059999999999999665, 0.5],
      [0.5100000000000001, -0.5000000000000001, 0.5],
    ],
    [
      [0.059999999999999776, 0.5, 0.5],
      [0.059999999999999776, -0.05999999999999994, 0.5],
      [0.06999999999999985, -0.07000000000000002, 0.5],
      [0.07, 0.5000000000000001, 0.5],
    ],
    [
      [0.05999999999999972, -0.5000000000000001, 0.5],
      [0.06999999999999973, -0.49999999999999994, 0.5],
      [0.06999999999999985, -0.07000000000000002, 0.5],
      [0.059999999999999776, -0.05999999999999994, 0.5],
    ],
    [
      [0.06999999999999985, -0.07000000000000002, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.5, 0.06999999999999984, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [0.07, 0.5000000000000001, 0.5],
    ],
    [
      [0.06999999999999973, -0.49999999999999994, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.06999999999999985, -0.07000000000000002, 0.5],
    ],
  ],
  [
    [
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
    ],
    [
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
    ],
  ],
  [
    [
      [0.05999999999999972, -0.05999999999999972, -0.5],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [0.05999999999999972, 0.5, -0.5],
    ],
    [
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [0.05999999999999972, -0.05999999999999972, -0.5],
      [0.05999999999999972, -0.5000000000000001, -0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
    ],
    [
      [0.5100000000000001, 0.5000000000000001, -0.5],
      [0.5100000000000001, 0.05999999999999983, -0.5],
      [0.5, 0.06999999999999995, -0.5],
      [0.5000000000000001, 0.5, -0.5],
    ],
    [
      [0.5, 0.06999999999999995, -0.5],
      [0.5100000000000001, 0.05999999999999983, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
    ],
    [
      [1.0699999999999998, -0.5000000000000002, -0.5],
      [0.5100000000000001, 0.05999999999999983, -0.5],
      [0.5100000000000001, 0.5000000000000001, -0.5],
      [1.07, 0.5, -0.5],
    ],
    [
      [0.5100000000000001, 0.05999999999999983, -0.5],
      [1.0699999999999998, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.5],
    ],
    [
      [0.06999999999999984, -0.0699999999999999, -0.5],
      [0.05999999999999972, -0.05999999999999972, -0.5],
      [0.05999999999999972, 0.5, -0.5],
      [0.07, 0.5000000000000001, -0.5],
    ],
    [
      [0.05999999999999972, -0.5000000000000001, -0.5],
      [0.05999999999999972, -0.05999999999999972, -0.5],
      [0.06999999999999984, -0.0699999999999999, -0.5],
      [0.06999999999999973, -0.49999999999999994, -0.5],
    ],
    [
      [0.5000000000000001, 0.5, -0.5],
      [0.5, 0.06999999999999995, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.06999999999999984, -0.0699999999999999, -0.5],
      [0.07, 0.5000000000000001, -0.5],
    ],
    [
      [0.06999999999999984, -0.0699999999999999, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.06999999999999973, -0.49999999999999994, -0.5],
    ],
  ],
  [
    [
      [0.05999999999999972, -0.5000000000000001, -0.05999999999999983],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [0.05999999999999972, -0.5000000000000001, -0.5],
    ],
    [
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [0.05999999999999972, -0.5000000000000001, -0.05999999999999983],
      [0.05999999999999972, -0.5000000000000001, 0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, -0.5],
      [0.5100000000000001, -0.5000000000000001, 0.05999999999999972],
      [0.4999999999999999, -0.5000000000000001, 0.06999999999999995],
      [0.4999999999999999, -0.5000000000000002, -0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.4999999999999999, -0.5000000000000001, 0.06999999999999995],
      [0.5100000000000001, -0.5000000000000001, 0.05999999999999972],
    ],
    [
      [1.0699999999999998, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.5000000000000001, 0.05999999999999972],
      [0.5100000000000001, -0.5000000000000001, -0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, 0.05999999999999972],
      [1.0699999999999998, -0.5000000000000002, -0.5],
      [1.0699999999999998, -0.5000000000000002, 0.5],
      [0.5100000000000001, -0.5000000000000001, 0.5],
    ],
    [
      [0.05999999999999972, -0.5000000000000001, -0.5],
      [0.06999999999999973, -0.49999999999999994, -0.5],
      [0.06999999999999973, -0.5000000000000001, -0.06999999999999984],
      [0.05999999999999972, -0.5000000000000001, -0.05999999999999983],
    ],
    [
      [0.05999999999999972, -0.5000000000000001, 0.5],
      [0.05999999999999972, -0.5000000000000001, -0.05999999999999983],
      [0.06999999999999973, -0.5000000000000001, -0.06999999999999984],
      [0.06999999999999973, -0.49999999999999994, 0.5],
    ],
    [
      [0.06999999999999973, -0.49999999999999994, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.06999999999999973, -0.5000000000000001, -0.06999999999999984],
    ],
    [
      [0.06999999999999973, -0.5000000000000001, -0.06999999999999984],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.06999999999999973, -0.49999999999999994, 0.5],
    ],
  ],
  [
    [
      [1.07, 0.5, -0.5],
      [1.07, 0.5, 0.5],
      [1.0699999999999998, -0.5000000000000002, 0.5],
    ],
    [
      [1.0699999999999998, -0.5000000000000002, 0.5],
      [1.0699999999999998, -0.5000000000000002, -0.5],
      [1.07, 0.5, -0.5],
    ],
  ],
];

test('Select Junction', (t) => {
  const normalize = createNormalize3();
  const selector = junctionSelector(solid, normalize);
  t.true(selector(normalize([-0.49999999999999994, 0.5000000000000001, -0.5])));
});
