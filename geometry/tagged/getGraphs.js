import { eachItem } from './eachItem.js';

export const getGraphs = (geometry) => {
  const graphs = [];
  eachItem(geometry, (item) => {
    if (item.type === 'graph') {
      graphs.push(item);
    }
  });
  return graphs;
};
