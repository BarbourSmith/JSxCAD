import { toTransformedGeometry, translate, measureBoundingBox } from './jsxcad-geometry-tagged.js';

/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accomodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply chosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

function GrowingPacker() {}

GrowingPacker.prototype = {

  fit: function fit(blocks) {
    var n,
        node,
        block,
        len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h)) block.fit = this.splitNode(node, block.w, block.h);else block.fit = this.growNode(block.w, block.h);
    }
  },

  findNode: function findNode(root, w, h) {
    if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);else if (w <= root.w && h <= root.h) return root;else return null;
  },

  splitNode: function splitNode(node, w, h) {
    node.used = true;
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  },

  growNode: function growNode(w, h) {
    var canGrowDown = w <= this.root.w;
    var canGrowRight = h <= this.root.h;

    var shouldGrowRight = canGrowRight && this.root.h >= this.root.w + w; // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown = canGrowDown && this.root.w >= this.root.h + h; // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight) return this.growRight(w, h);else if (shouldGrowDown) return this.growDown(w, h);else if (canGrowRight) return this.growRight(w, h);else if (canGrowDown) return this.growDown(w, h);else return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function growRight(w, h) {
    var node;
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    };
    if (node = this.findNode(this.root, w, h)) return this.splitNode(node, w, h);else return null;
  },

  growDown: function growDown(w, h) {
    var node;
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down: { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    if (node = this.findNode(this.root, w, h)) return this.splitNode(node, w, h);else return null;
  }

};

/******************************************************************************

This is a very simple binary tree based bin packing algorithm that is initialized
with a fixed width and height and will fit each block into the first node where
it fits and then split that node into 2 parts (down and right) to track the
remaining whitespace.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  w:       width of target rectangle
  h:      height of target rectangle
  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new Packer(500, 500);
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

function Packer(w, h) {
  this.init(w, h);
}

Packer.prototype = {

  init: function init(w, h) {
    this.root = { x: 0, y: 0, w: w, h: h };
  },

  fit: function fit(blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h)) block.fit = this.splitNode(node, block.w, block.h);
    }
  },

  findNode: function findNode(root, w, h) {
    if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);else if (w <= root.w && h <= root.h) return root;else return null;
  },

  splitNode: function splitNode(node, w, h) {
    node.used = true;
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  }

};

const X = 0;
const Y = 1;

const measureSize = (geometry) => {
  const [min, max] = measureBoundingBox(geometry);
  const width = max[X] - min[X];
  const height = max[Y] - min[Y];
  return [width, height];
};

const measureOrigin = (geometry) => {
  const [min] = measureBoundingBox(geometry);
  const [x, y] = min;
  return [x, y];
};

const measureOffsets = (size, pageMargin) => {
  if (size) {
    const [width, height] = size;

    // Center the output to match pages.
    const xOffset = width / -2;
    const yOffset = height / -2;
    const packer = new Packer(width - pageMargin * 2, height - pageMargin * 2);

    return [xOffset, yOffset, packer];
  } else {
    const packer = new GrowingPacker();
    return [0, 0, packer];
  }
};

const pack = ({ size, itemMargin = 1, pageMargin = 5 }, ...geometries) => {
  const [xOffset, yOffset, packer] = measureOffsets(size, pageMargin);

  const packedGeometries = [];
  const unpackedGeometries = [];

  const blocks = [];

  for (const geometry of geometries) {
    const [width, height] = measureSize(geometry);
    const [w, h] = [width + itemMargin * 2, height + itemMargin * 2];
    blocks.push({ w, h, geometry });
  }

  blocks.sort((a, b) => b.h < a.h); // sort inputs for best results

  packer.fit(blocks);

  for (const { geometry, fit } of blocks) {
    if (fit && fit.used) {
      const [x, y] = measureOrigin(geometry);
      const xo = 0 + xOffset + (fit.x - x + itemMargin + pageMargin);
      const yo = 0 + yOffset + (fit.y - y + itemMargin + pageMargin);
      const transformed = toTransformedGeometry(translate([xo, yo, 0], geometry));
      packedGeometries.push(transformed);
    } else {
      unpackedGeometries.push(geometry);
    }
  }

  return [packedGeometries, unpackedGeometries];
};

export { pack };
