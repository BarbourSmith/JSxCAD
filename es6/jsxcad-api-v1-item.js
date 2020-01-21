import Shape, { Shape as Shape$1 } from './jsxcad-api-v1-shape.js';
import { rewriteTags, visit, rewrite, getItems } from './jsxcad-geometry-tagged.js';

const registry = [];

const fromDesignator = (designator) => {
  for (const { parser, constructor } of registry) {
    const spec = parser(designator);
    if (spec !== undefined) {
      return constructor(spec);
    }
  }
  throw Error('die');
};

const registerDesignator = (parser, constructor) =>
  registry.push({ parser, constructor });

/**
 *
 * # Item
 *
 * Encapsulates a geometry as a discrete item.
 *
 **/

// Constructs an item from the designator.
const Item = (designator) => {
  if (typeof designator === 'string') {
    return fromDesignator(designator);
  } else if (designator instanceof Array) {
    return fromDesignator(...designator);
  }
};

// Turns the current shape into an item.
const itemMethod = function (id) {
  return Shape.fromGeometry(rewriteTags([`item/${id}`], [], { item: this.toGeometry() }));
};

Shape.prototype.Item = itemMethod;
Shape.prototype.toItem = itemMethod;

Item.signature = 'Item(shape:Shape, id:string) -> Shape';
itemMethod.signature = 'Shape -> toItem(id:string) -> Shape';

/**
 *
 * # Bill Of Materials
 *
 **/

const bom = (shape) => {
  const bom = [];
  visit(shape.toKeptGeometry(),
        (geometry, descend) => {
          if (geometry.item) {
            bom.push(geometry.tags.filter(tag => tag.startsWith('item/'))
                .map(tag => tag.substring(5)));
          }
          descend();
        });
  return bom;
};

const bomMethod = function (...args) { return bom(this); };
Shape.prototype.bom = bomMethod;

bomMethod.signature = 'Shape -> bom() -> string';

const fuse = (shape, op = (_ => _)) =>
  Shape.fromGeometry(rewrite(shape.toKeptGeometry(),
                             (geometry, descend, walk) => {
                               if (geometry.item) {
                                 return walk(geometry.item);
                               } else {
                                 return descend();
                               }
                             }));

const fuseMethod = function (...args) { return fuse(this, ...args); };
Shape.prototype.fuse = fuseMethod;

fuse.signature = 'fuse(shape:Shape, op:function) -> Shapes';
fuseMethod.signature = 'Shape -> fuse(op:function) -> Shapes';

const inItems = (shape, op = (_ => _)) =>
  Shape.fromGeometry(rewrite(shape.toKeptGeometry(),
                             (geometry, descend) => {
                               if (geometry.item) {
                                 // Operate on the interior of the items.
                                 const item = op(Shape.fromGeometry(geometry.item));
                                 // Reassemble as an item equivalent to the original.
                                 return { ...geometry, item: item.toGeometry() };
                               } else {
                                 return descend();
                               }
                             }));

const inItemsMethod = function (...args) { return inItems(this, ...args); };
Shape.prototype.inItems = inItemsMethod;

inItems.signature = 'inItems(shape:Shape, op:function) -> Shapes';
inItemsMethod.signature = 'Shape -> inItems(op:function) -> Shapes';

const items = (shape, op = (_ => _)) => {
  const items = [];
  for (const item of getItems(shape.toKeptGeometry())) {
    items.push(op(Shape.fromGeometry(item)));
  }
  return items;
};

const itemsMethod = function (...args) { return items(this, ...args); };
Shape.prototype.items = itemsMethod;

items.signature = 'items(shape:Shape, op:function) -> Shapes';
itemsMethod.signature = 'Shape -> items(op:function) -> Shapes';

const toBillOfMaterial = (shape) => {
  const specifications = [];
  for (const { tags } of getItems(shape.toKeptGeometry())) {
    for (const tag of tags) {
      if (tag.startsWith('item/')) {
        const specification = tag.substring(5);
        specifications.push(specification);
      }
    }
  }
  return specifications;
};

const toBillOfMaterialMethod = function (options = {}) { return toBillOfMaterial(this); };

Shape$1.prototype.toBillOfMaterial = toBillOfMaterialMethod;

const api = {
  Item,
  bom,
  fromDesignator,
  fuse,
  inItems,
  items,
  registerDesignator,
  toBillOfMaterial: toBillOfMaterialMethod
};

export default api;
export { Item, bom, fromDesignator, fuse, inItems, items, registerDesignator, toBillOfMaterialMethod as toBillOfMaterial };
