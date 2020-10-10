import { Shape, getPegCoords } from '@jsxcad/api-v1-shape';
import {
  section as sectionGeometry,
  taggedGroup,
} from '@jsxcad/geometry-tagged';

export const section = (shape, ...pegs) => {
  const planes = [];
  if (pegs.length === 0) {
    planes.push([0, 0, 1, 0]);
  } else {
    for (const peg of pegs) {
      const { plane } = getPegCoords(peg);
      planes.push(plane);
    }
  }
  const sections = [];
  for (const plane of planes) {
    sections.push(sectionGeometry(plane, shape.toGeometry()));
  }
  if (sections.length > 1) {
    return Shape.fromGeometry(taggedGroup({}, ...sections));
  } else {
    return Shape.fromGeometry(sections[0]);
  }
};

const sectionMethod = function (...args) {
  return section(this, ...args);
};
Shape.prototype.section = sectionMethod;

export default section;
