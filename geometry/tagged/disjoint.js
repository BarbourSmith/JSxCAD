import { difference } from './difference.js';
import { taggedDisjointAssembly } from './taggedDisjointAssembly.js';

export const disjoint = (geometries) => {
  for (let sup = geometries.length - 1; sup >= 0; sup--) {
    for (let sub = geometries.length - 1; sub > sup; sub--) {
      geometries[sup] = difference(geometries[sup], geometries[sub]);
    }
  }
  return taggedDisjointAssembly({}, ...geometries);
};
