import { reify } from './reify.js';
import { test as testGraph } from '../graph/test.js';
import { visit } from './visit.js';

export const test = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return testGraph(geometry.graph);
      case 'solid':
      case 'z0Surface':
      case 'surface':
      case 'points':
      case 'paths':
        return;
      case 'plan':
        return test(reify(geometry).content[0]);
      case 'transform':
      case 'layout':
      case 'item':
      case 'group':
      case 'sketch':
        return descend();
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  visit(geometry, op);
  return geometry;
};
