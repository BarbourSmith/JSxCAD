import { addPending, emit, getModule, write } from '@jsxcad/sys';

import Shape from '@jsxcad/api-v1-shape';
import { ensurePages } from '@jsxcad/api-v1-shapes';
import { nanoid } from 'nanoid/non-secure';
import { soup } from '@jsxcad/geometry-tagged';

// FIX: Avoid the extra read-write cycle.
const view = (
  shape,
  size,
  op = (x) => x,
  {
    inline,
    width = 1024,
    height = 512,
    position = [100, -100, 100],
    withAxes = false,
    withGrid = false,
  } = {}
) => {
  if (size !== undefined) {
    width = size;
    height = size / 2;
  }
  const viewShape = op(shape);
  for (const entry of ensurePages(soup(viewShape.toDisjointGeometry()))) {
    const path = `view/${getModule()}/${nanoid()}`;
    addPending(write(path, entry));
    const view = { width, height, position, inline, withAxes, withGrid };
    emit({ hash: nanoid(), path, view });
  }
  return shape;
};

Shape.prototype.view = function (
  size = 256,
  op,
  {
    path,
    width = 1024,
    height = 512,
    position = [100, -100, 100],
    withAxes,
    withGrid,
  } = {}
) {
  return view(this, size, op, {
    path,
    width,
    height,
    position,
    withAxes,
    withGrid,
  });
};

Shape.prototype.topView = function (
  size = 256,
  op,
  {
    path,
    width = 1024,
    height = 512,
    position = [0, 0, 100],
    withAxes,
    withGrid,
  } = {}
) {
  return view(this, size, op, {
    path,
    width,
    height,
    position,
    withAxes,
    withGrid,
  });
};

Shape.prototype.gridView = function (
  size = 256,
  op,
  {
    path,
    width = 1024,
    height = 512,
    position = [0, 0, 100],
    withAxes,
    withGrid = true,
  } = {}
) {
  return view(this, size, op, {
    path,
    width,
    height,
    position,
    withAxes,
    withGrid,
  });
};

Shape.prototype.frontView = function (
  size = 256,
  op,
  {
    path,
    width = 1024,
    height = 512,
    position = [0, -100, 0],
    withAxes,
    withGrid,
  } = {}
) {
  return view(this, size, op, {
    path,
    width,
    height,
    position,
    withAxes,
    withGrid,
  });
};

Shape.prototype.sideView = function (
  size = 256,
  op,
  {
    path,
    width = 1024,
    height = 512,
    position = [100, 0, 0],
    withAxes,
    withGrid,
  } = {}
) {
  return view(this, size, op, {
    path,
    width,
    height,
    position,
    withAxes,
    withGrid,
  });
};
