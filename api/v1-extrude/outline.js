import { Group } from '@jsxcad/api-v1-shapes';
import { Shape } from '@jsxcad/api-v1-shape';
import { outline as outlineGeometry } from '@jsxcad/geometry-tagged';

export const outline = (shape) =>
  Group(
    ...outlineGeometry(shape.toGeometry()).map((outline) =>
      Shape.fromGeometry(outline)
    )
  );

const outlineMethod = function () {
  return outline(this);
};

const withOutlineMethod = function (op = (x) => x) {
  return this.and(op(outline(this)));
};

Shape.prototype.outline = outlineMethod;
Shape.prototype.wire = outlineMethod;

Shape.prototype.andOutline = withOutlineMethod;
Shape.prototype.andWire = withOutlineMethod;

Shape.prototype.withOutline = withOutlineMethod;
Shape.prototype.withWire = withOutlineMethod;

export default outline;
