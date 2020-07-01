import { eachNonVoidItem } from './eachNonVoidItem';

export const getNonVoidSolids = (geometry) => {
  const solids = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'solid') {
      solids.push(item);
    }
  });
  return solids;
};
