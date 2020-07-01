import './jsxcad-api-v1-item.js';
import { Square, Layers, Empty, Polygon, Circle, Path } from './jsxcad-api-v1-shapes.js';
import { getLeafs, getPlans, visit, isNotVoid } from './jsxcad-geometry-tagged.js';
import { Hershey } from './jsxcad-api-v1-font.js';
import Plan$1, { Plan } from './jsxcad-api-v1-plan.js';
import Shape, { Shape as Shape$1, assemble } from './jsxcad-api-v1-shape.js';
import { max } from './jsxcad-api-v1-math.js';
import { pack } from './jsxcad-api-v1-layout.js';

const MIN = 0;
const MAX = 1;
const X = 0;
const Y = 1;

const getItemNames = (geometry) => {
  const names = new Set();
  const op = (geometry, descend) => {
    if (
      geometry.type === 'item' &&
      isNotVoid(geometry) &&
      geometry.tags &&
      geometry.tags.some((tag) => tag.startsWith('item/'))
    ) {
      geometry.tags
        .filter((tag) => tag.startsWith('item/'))
        .forEach((tag) => names.add(tag.substring(5)));
    } else {
      descend();
    }
  };
  visit(geometry, op);
  return [...names].sort();
};

const Page = (
  { size, pageMargin = 5, itemMargin = 1, itemsPerPage = Infinity },
  ...shapes
) => {
  const layers = [];
  for (const shape of shapes) {
    for (const leaf of getLeafs(shape.toKeptGeometry())) {
      layers.push(leaf);
    }
  }
  const r = (v) => Math.floor(v * 100) / 100;
  const labelScale = 0.0125 * 5;
  if (size) {
    // Content fits to page size.
    const packSize = [];
    const content = pack(
      Shape.fromGeometry({ type: 'layers', content: layers }),
      {
        size,
        pageMargin,
        itemMargin,
        perLayout: itemsPerPage,
        packSize,
      }
    );
    const pageWidth = packSize[MAX][X] - packSize[MIN][X];
    const pageLength = packSize[MAX][Y] - packSize[MIN][Y];
    const plans = [];
    for (const layer of content.toKeptGeometry().content[0].content) {
      const itemNames = getItemNames(layer);
      plans.push(
        Plan({
          plan: { page: { size, margin: pageMargin } },
          marks: packSize,
          content: [Shape.fromGeometry(layer)],
          visualization: Square(pageWidth, pageLength)
            .outline()
            .with(
              Hershey(max(pageWidth, pageLength) * labelScale)(
                `${r(pageWidth)} x ${r(pageLength)} : ${itemNames.join(', ')}`
              ).move(pageWidth / -2, (pageLength * (1 + labelScale)) / 2)
            )
            .color('red'),
        }).Item()
      );
    }
    return Layers(...plans);
  } else {
    const packSize = [];
    // Page fits to content size.
    const content = pack(
      Shape.fromGeometry({ type: 'layers', content: layers }),
      {
        pageMargin,
        itemMargin,
        perLayout: itemsPerPage,
        packSize,
      }
    );
    // FIX: Using content.size() loses the margin, which is a problem for repacking.
    // Probably page plans should be generated by pack and count toward the size.
    const pageWidth = packSize[MAX][X] - packSize[MIN][X];
    const pageLength = packSize[MAX][Y] - packSize[MIN][Y];
    if (isFinite(pageWidth) && isFinite(pageLength)) {
      const plans = [];
      for (const layer of content.toKeptGeometry().content[0].content) {
        const itemNames = getItemNames(layer);
        plans.push(
          Plan({
            plan: {
              page: { size: [pageWidth, pageLength], margin: pageMargin },
            },
            content: [Shape.fromGeometry(layer).center()],
            marks: packSize,
            visualization: Square(pageWidth, pageLength)
              .outline()
              .with(
                Hershey(max(pageWidth, pageLength) * labelScale)(
                  `${r(pageWidth)} x ${r(pageLength)} : ${itemNames.join(', ')}`
                ).move(pageWidth / -2, (pageLength * (1 + labelScale)) / 2)
              )
              .color('red'),
          }).Item()
        );
      }
      return Layers(...plans);
    } else {
      return Empty();
    }
  }
};

Plan.Page = Page;

const PageMethod = function (options = {}) {
  return Page(options, this);
};
Shape.prototype.Page = PageMethod;

const ensurePages = (geometry, depth = 0) => {
  const pages = getPlans(geometry).filter((entry) => entry.plan.page);
  if (pages.length === 0 && depth === 0) {
    return ensurePages(
      Page({}, Shape.fromGeometry(geometry)).toGeometry(),
      depth + 1
    );
  } else {
    return pages;
  }
};

const dp2 = (number) => Math.round(number * 100) / 100;

const Apothem = (apothem = 1, sides = 32, center = [0, 0, 0]) => {
  const radius = Polygon.toRadiusFromApothem(apothem, sides);
  return Plan$1({
    plan: { apothem },
    marks: [center],
    visualization: Circle.ofRadius(radius)
      .outline()
      .add(Path([0, 0, 0], [0, radius, 0]))
      .add(Hershey(radius / 10)(`A${dp2(apothem)}`).moveY(radius / 2))
      .color('red'),
  });
};

Plan$1.Apothem = Apothem;

const Diameter = (diameter = 1, center = [0, 0, 0]) => {
  const radius = diameter / 2;
  return Plan$1({
    plan: { diameter },
    marks: [center],
    visualization: Circle.ofDiameter(diameter)
      .outline()
      .add(Path([0, -radius, 0], [0, +radius, 0]))
      .add(Hershey(radius / 10)(`D${dp2(diameter)}`))
      .color('red'),
  });
};
Plan$1.Diameter = Diameter;

const Label = (label, mark = [0, 0, 0]) =>
  Plan$1({ plan: { label }, marks: [mark] });
Plan$1.Label = Label;

const withLabelMethod = function (...args) {
  return assemble(this, Plan$1.Label(...args));
};
Shape$1.prototype.withLabel = withLabelMethod;

const Length = (length) => {
  return Plan$1({
    plan: { length },
    visualization: Path([0, 0, 0], [0, length, 0])
      .add(Hershey(length / 10)(`L${dp2(length)}`).moveY(length / 2))
      .color('red'),
  });
};
Plan$1.Length = Length;

// Radius

const Radius = (radius = 1, center = [0, 0, 0]) =>
  Plan$1({
    plan: { radius },
    marks: [center],
    visualization: Circle.ofRadius(radius)
      .outline()
      .add(Path([0, 0, 0], [0, radius, 0]))
      .add(Hershey(radius / 10)(`R${dp2(radius)}`).moveY(radius / 2))
      .color('red'),
  });
Plan$1.Radius = Radius;

const Sketch = (shape) => {
  return Plan$1({
    plan: { sketch: 'shape' },
    visualization: shape.outline().color('red'),
  });
};
Plan$1.Sketch = Sketch;

Shape$1.prototype.sketch = function (...args) {
  return Sketch(this);
};
Shape$1.prototype.withSketch = function (...args) {
  return assemble(this, Sketch(this));
};

const api = {
  Apothem,
  Diameter,
  Label,
  Length,
  Page,
  Radius,
  Sketch,
};

export default api;
export { Apothem, Diameter, Label, Length, Page, Radius, Sketch, ensurePages };
