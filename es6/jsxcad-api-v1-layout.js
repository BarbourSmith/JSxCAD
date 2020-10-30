import { Empty, Square, Hershey } from './jsxcad-api-v1-shapes.js';
import { getLeafs, taggedItem, taggedDisjointAssembly, toDisjointGeometry, taggedLayers, measureBoundingBox, taggedLayout, getLayouts, visit, isNotVoid } from './jsxcad-geometry-tagged.js';
import Shape from './jsxcad-api-v1-shape.js';
import { max } from './jsxcad-api-v1-math.js';
import { pack as pack$1 } from './jsxcad-algorithm-pack.js';

const pack = (
  shape,
  { size, pageMargin = 5, itemMargin = 1, perLayout = Infinity, packSize = [] }
) => {
  if (perLayout === 0) {
    // Packing was disabled -- do nothing.
    return shape;
  }

  let todo = [];
  for (const leaf of getLeafs(shape.toKeptGeometry())) {
    todo.push(leaf);
  }
  const packedLayers = [];
  while (todo.length > 0) {
    const input = [];
    while (todo.length > 0 && input.length < perLayout) {
      input.push(todo.shift());
    }
    const [packed, unpacked, minPoint, maxPoint] = pack$1(
      { size, pageMargin, itemMargin },
      ...input
    );
    packSize[0] = minPoint;
    packSize[1] = maxPoint;
    if (packed.length === 0) {
      break;
    } else {
      packedLayers.push(
        taggedItem(
          {},
          taggedDisjointAssembly({}, ...packed.map(toDisjointGeometry))
        )
      );
    }
    todo.unshift(...unpacked);
  }
  let packedShape = Shape.fromGeometry(taggedLayers({}, ...packedLayers));
  if (size === undefined) {
    packedShape = packedShape.center({
      centerX: true,
      centerY: true,
      centerZ: false,
    });
  }
  return packedShape;
};

const packMethod = function (...args) {
  return pack(this, ...args);
};
Shape.prototype.pack = packMethod;

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

const buildLayoutGeometry = ({
  layer,
  packSize,
  pageWidth,
  pageLength,
  margin,
}) => {
  const itemNames = getItemNames(layer);
  const labelScale = 0.0125 * 10;
  const size = [pageWidth, pageLength];
  const r = (v) => Math.floor(v * 100) / 100;
  const title = `${r(pageWidth)} x ${r(pageLength)} : ${itemNames.join(', ')}`;
  const visualization = Square(
    Math.max(pageWidth, margin),
    Math.max(pageLength, margin)
  )
    .outline()
    .with(
      Hershey(max(pageWidth, pageLength) * labelScale)(title).move(
        pageWidth / -2,
        (pageLength * (1 + labelScale)) / 2
      )
    )
    .color('red')
    .sketch()
    .toGeometry();
  return taggedLayout(
    { size, margin, title, marks: packSize },
    layer,
    visualization
  );
};

const Page = (
  {
    size,
    pageMargin = 5,
    itemMargin = 1,
    itemsPerPage = Infinity,
    pack: pack$1 = true,
  },
  ...shapes
) => {
  const margin = itemMargin;
  const layers = [];
  for (const shape of shapes) {
    for (const leaf of getLeafs(shape.toDisjointGeometry())) {
      layers.push(leaf);
    }
  }
  if (!pack$1) {
    const layer = taggedLayers({}, ...layers);
    const packSize = measureBoundingBox(layer);
    const pageWidth = packSize[MAX][X] - packSize[MIN][X];
    const pageLength = packSize[MAX][Y] - packSize[MIN][Y];
    return Shape.fromGeometry(
      buildLayoutGeometry({ layer, packSize, pageWidth, pageLength, margin })
    );
  } else if (size) {
    // Content fits to page size.
    const packSize = [];
    const content = pack(Shape.fromGeometry(taggedLayers({}, ...layers)), {
      size,
      pageMargin,
      itemMargin,
      perLayout: itemsPerPage,
      packSize,
    });
    if (packSize.length === 0) {
      throw Error('Packing failed');
    }
    const pageWidth = packSize[MAX][X] - packSize[MIN][X];
    const pageLength = packSize[MAX][Y] - packSize[MIN][Y];
    const plans = [];
    for (const layer of content.toDisjointGeometry().content[0].content) {
      plans.push(
        buildLayoutGeometry({ layer, packSize, pageWidth, pageLength, margin })
      );
    }
    return Shape.fromGeometry(taggedLayers({}, ...plans)).canonicalize();
  } else {
    const packSize = [];
    // Page fits to content size.
    const content = pack(Shape.fromGeometry(taggedLayers({}, ...layers)), {
      pageMargin,
      itemMargin,
      perLayout: itemsPerPage,
      packSize,
    });
    if (packSize.length === 0) {
      throw Error('Packing failed');
    }
    // FIX: Using content.size() loses the margin, which is a problem for repacking.
    // Probably page plans should be generated by pack and count toward the size.
    const pageWidth = packSize[MAX][X] - packSize[MIN][X];
    const pageLength = packSize[MAX][Y] - packSize[MIN][Y];
    if (isFinite(pageWidth) && isFinite(pageLength)) {
      const plans = [];
      for (const layer of content.toDisjointGeometry().content[0].content) {
        const layoutGeometry = buildLayoutGeometry({
          layer,
          packSize,
          pageWidth,
          pageLength,
          margin,
        });
        Shape.fromGeometry(layoutGeometry).canonicalize();
        plans.push(layoutGeometry);
      }
      return Shape.fromGeometry(taggedLayers({}, ...plans));
    } else {
      return Empty().canonicalize();
    }
  }
};

const PageMethod = function (options = {}) {
  return Page(options, this);
};
Shape.prototype.Page = PageMethod; // Deprecate
Shape.prototype.page = PageMethod;

const ensurePages = (geometry, depth = 0) => {
  const pages = getLayouts(geometry);
  if (pages.length === 0 && depth === 0) {
    return ensurePages(
      Page({}, Shape.fromGeometry(geometry)).toDisjointGeometry(),
      depth + 1
    );
  } else {
    return pages;
  }
};

const PackMethod = function (options = {}) {
  return Page(options, this);
};
Shape.prototype.Pack = PackMethod; // Deprecate
Shape.prototype.pack = PackMethod;

const FixMethod = function (options = {}) {
  return Page({ ...options, pack: false }, this);
};
Shape.prototype.Fix = FixMethod; // Deprecate
Shape.prototype.fix = FixMethod;

const api = {
  pack,
};

export default api;
export { Page, ensurePages, pack };
