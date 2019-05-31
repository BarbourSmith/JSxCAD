export const addTags = (tags, geometry) => {
  const copy = Object.assign({}, geometry);
  if (copy.tags) {
    copy.tags = [...tags, ...copy.tags];
  } else {
    copy.tags = [...tags];
  }
  return copy;
};