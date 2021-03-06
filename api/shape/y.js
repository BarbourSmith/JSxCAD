import Shape from './Shape.js';
import move from './move.js';

export const y =
  (...y) =>
  (shape) =>
    Shape.Group(...y.map((y) => move(0, y)(shape)));

Shape.registerMethod('y', y);
