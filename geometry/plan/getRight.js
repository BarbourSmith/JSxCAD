import { getRadius } from './getRadius.js';

const X = 0;

export const getRight = (plan) => {
  if (typeof plan === 'number') {
    return plan;
  }
  switch (plan.type) {
    case 'edge':
      return plan._at[X] + plan._high[X];
    case 'corners':
      return plan._right;
    case 'box':
      return plan._length / 2;
    default:
      return getRadius(plan)[X];
  }
};
