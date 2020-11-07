import { read, write } from '@jsxcad/geometry-tagged';

import Shape from './Shape.js';

export const loadGeometry = async (path) =>
  Shape.fromGeometry(await read(path));

export const saveGeometry = async (path, shape) =>
  Shape.fromGeometry(await write(shape.toGeometry(), path));
