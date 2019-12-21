import Shape from './Shape';
import { dot } from '@jsxcad/math-vec3';
import faceConnector from './faceConnector';
import { toPlane } from '@jsxcad/geometry-surface';

const Z = 2;

export const top = (shape) =>
  faceConnector(shape, (surface) => dot(toPlane(surface), [0, 0, 1, 0]), (point) => point[Z]);

const topMethod = function () { return top(this); };
Shape.prototype.top = topMethod;

top.signature = 'top(shape:Shape) -> Shape';
topMethod.signature = 'Shape -> top() -> Shape';
