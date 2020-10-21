import Shape$1, { Shape, shapeMethod } from './jsxcad-api-v1-shape.js';
import { buildRingSphere, toRadiusFromApothem as toRadiusFromApothem$1, regularPolygonEdgeLengthToRadius, buildRegularPrism, buildFromFunction, buildFromSlices, buildRegularPolygon, buildPolygonFromPoints, buildRegularIcosahedron, buildRegularTetrahedron } from './jsxcad-algorithm-shape.js';
import { taggedSolid, getPaths, taggedAssembly, taggedZ0Surface, getAnySurfaces, taggedDisjointAssembly, taggedLayers, taggedPoints } from './jsxcad-geometry-tagged.js';
import { concatenate, rotateZ, translate as translate$1 } from './jsxcad-geometry-path.js';
import { numbers, linear } from './jsxcad-api-v1-math.js';
import { translate } from './jsxcad-geometry-paths.js';
import { add } from './jsxcad-math-vec3.js';
import { toPolygon } from './jsxcad-math-plane.js';

const unitSphere = (resolution = 16) => {
  const shape = Shape.fromGeometry(
    taggedSolid({}, buildRingSphere(resolution))
  );
  return shape.toGraph();
};

const ofRadius = (radius = 1, { resolution = 16 } = {}) =>
  unitSphere(resolution).scale(radius);
const ofApothem = (apothem = 1, { resolution = 16 } = {}) =>
  ofRadius(toRadiusFromApothem$1(apothem, (2 + resolution) * 2), { resolution });
const ofDiameter = (diameter = 1, { resolution = 16 } = {}) =>
  ofRadius(diameter / 2, { resolution });

const ofPlan = (plan) => {
  switch (plan.type) {
    default: {
      const width = Math.abs(plan.length);
      const length = Math.abs(plan.width);
      const height = Math.abs(plan.height);
      return unitSphere()
        .scale(width / 2, length / 2, height / 2)
        .move(...plan.center);
    }
  }
};

const Ball = (...args) => {
  if (typeof args[0] === 'object') {
    return ofPlan(...args);
  } else {
    return ofRadius(...args);
  }
};

const BallOfApothem = ofApothem;
const BallOfRadius = ofRadius;
const BallOfDiameter = ofDiameter;

Shape.prototype.Ball = shapeMethod(Ball);
Shape.prototype.BallOfApothem = shapeMethod(BallOfApothem);
Shape.prototype.BallOfDiameter = shapeMethod(BallOfDiameter);
Shape.prototype.BallOfRadius = shapeMethod(BallOfRadius);

const edgeScale = regularPolygonEdgeLengthToRadius(1, 4);

const unitCube = () =>
  Shape.fromGeometry(taggedSolid({}, buildRegularPrism(4)))
    .toGraph()
    .rotateZ(45)
    .scale(edgeScale, edgeScale, 1);

// Box Interfaces.

const ofPlan$1 = (plan) => {
  switch (plan.type) {
    default: {
      const width = Math.abs(plan.length);
      const length = Math.abs(plan.width);
      const height = Math.abs(plan.height);
      return unitCube()
        .scale(width, length, height)
        .move(...plan.center);
    }
  }
};

const ofSize = (width = 1, length = width, height = length) =>
  unitCube().scale(width, length, height);

const ofEdge = (length = 1) => ofSize(1);

const ofRadius$1 = (radius) =>
  Shape.fromGeometry(taggedSolid({}, buildRegularPrism(4)))
    .rotateZ(45)
    .scale(radius, radius, radius / edgeScale);

const ofApothem$1 = (apothem) => ofRadius$1(toRadiusFromApothem$1(apothem, 4));

const ofDiameter$1 = (diameter) => ofRadius$1(diameter / 2);

const fromCorners = (corner1 = [1, 1, 1], corner2 = [0, 0, 0]) => {
  const [c1x, c1y, c1z] = corner1;
  const [c2x, c2y, c2z] = corner2;
  const length = c2x - c1x;
  const width = c2y - c1y;
  const height = c2z - c1z;
  const center = [(c1x + c2x) / 2, (c1y + c2y) / 2, (c1z + c2z) / 2];
  return unitCube()
    .scale(length, width, height)
    .move(...center);
};

const Box = (...args) => {
  if (typeof args[0] === 'object') {
    return ofPlan$1(...args);
  } else {
    return ofSize(...args);
  }
};

const BoxOfApothem = ofApothem$1;
const BoxOfCorners = fromCorners;
const BoxOfDiameter = ofDiameter$1;
const BoxOfEdge = ofEdge;
const BoxOfRadius = ofRadius$1;
const BoxOfSize = ofSize;

Shape.prototype.Box = shapeMethod(Box);
Shape.prototype.BoxOfApothem = shapeMethod(BoxOfApothem);
Shape.prototype.BoxOfCorners = shapeMethod(BoxOfCorners);
Shape.prototype.BoxOfDiameter = shapeMethod(BoxOfDiameter);
Shape.prototype.BoxOfEdge = shapeMethod(BoxOfEdge);
Shape.prototype.BoxOfRadius = shapeMethod(BoxOfRadius);
Shape.prototype.BoxOfSize = shapeMethod(BoxOfSize);

const buildPrism = (radius = 1, height = 1, sides = 32) =>
  Shape.fromGeometry(taggedSolid({}, buildRegularPrism(sides)))
    .toGraph()
    .scale(radius, radius, height);

const ofRadius$2 = (radius = 1, height = 1, { sides = 32 } = {}) =>
  buildPrism(radius, height, sides);
const ofApothem$2 = (apothem = 1, height = 1, { sides = 32 } = {}) =>
  ofRadius$2(toRadiusFromApothem$1(apothem, sides), height, { sides });
const ofDiameter$2 = (diameter = 1, ...args) =>
  ofRadius$2(diameter / 2, ...args);

const toPathFromShape = (shape) => {
  for (const { paths } of getPaths(shape.toKeptGeometry())) {
    for (const path of paths) {
      return path;
    }
  }
  return [];
};

const ofFunction = (op, { resolution, cap = true, context } = {}) =>
  Shape.fromGeometry(
    taggedSolid({}, buildFromFunction(op, resolution, cap, context))
  ).toGraph();

const ofSlices = (op, { slices = 2, cap = true } = {}) =>
  Shape.fromGeometry(
    taggedSolid(
      {},
      buildFromSlices((slice) => toPathFromShape(op(slice)), slices, cap)
    )
  ).toGraph();

const ofPlan$2 = (plan) => {
  switch (plan.type) {
    default: {
      const width = Math.abs(plan.length);
      const length = Math.abs(plan.width);
      const height = Math.abs(plan.height);
      return ofRadius$2()
        .scale(width / 2, length / 2, height)
        .move(...plan.center);
    }
  }
};

const Rod = (...args) => {
  if (typeof args[0] === 'object') {
    return ofPlan$2(...args);
  } else {
    return ofRadius$2(...args);
  }
};

const RodOfRadius = ofRadius$2;
const RodOfApothem = ofApothem$2;
const RodOfDiameter = ofDiameter$2;
const RodOfFunction = ofFunction;
const RodOfSlices = ofSlices;

Shape.prototype.Rod = shapeMethod(Rod);
Shape.prototype.RodOfApothem = shapeMethod(RodOfApothem);
Shape.prototype.RodOfDiameter = shapeMethod(RodOfDiameter);
Shape.prototype.RodOfFunction = shapeMethod(RodOfFunction);
Shape.prototype.RodOfRadius = shapeMethod(RodOfRadius);
Shape.prototype.RodOfSlices = shapeMethod(RodOfSlices);

const Spiral = (
  toPathFromAngle = (angle) => [[angle]],
  { from = 0, to = 360, by, resolution } = {}
) => {
  if (by === undefined && resolution === undefined) {
    by = 1;
  }
  let path = [null];
  for (const angle of numbers((angle) => angle, { from, to, by, resolution })) {
    const radians = (angle * Math.PI) / 180;
    const subpath = toPathFromAngle(angle);
    path = concatenate(path, rotateZ(radians, subpath));
  }
  return Shape.fromPath(path);
};

Shape.prototype.Spiral = shapeMethod(Spiral);

const ofRadius$3 = (radius, angle = 360, { start = 0, sides = 32 } = {}) =>
  Spiral((a) => [[radius]], {
    from: start,
    to: start + angle,
    resolution: sides,
  });

const Arc = (...args) => ofRadius$3(...args);
Arc.ofRadius = ofRadius$3;

Shape.prototype.Arc = shapeMethod(Arc);

const isDefined = (value) => value !== undefined;

const Assembly = (...shapes) =>
  Shape.fromGeometry(
    taggedAssembly(
      {},
      ...shapes.filter(isDefined).map((shape) => shape.toGeometry())
    )
  );

Shape.prototype.Assembly = shapeMethod(Assembly);

const unitPolygon = (sides = 16) =>
  Shape.fromGeometry(
    taggedZ0Surface({}, [buildRegularPolygon(sides)])
  ).toGraph();

// Note: radius here is circumradius.
const toRadiusFromEdge = (edge, sides) =>
  edge * regularPolygonEdgeLengthToRadius(1, sides);

const ofRadius$4 = (radius, { sides = 16 } = {}) =>
  unitPolygon(sides).scale(radius);
const ofEdge$1 = (edge, { sides = 16 }) =>
  ofRadius$4(toRadiusFromEdge(edge, sides), { sides });
const ofApothem$3 = (apothem, { sides = 16 }) =>
  ofRadius$4(toRadiusFromApothem$1(apothem, sides), { sides });
const ofDiameter$3 = (diameter, ...args) =>
  ofRadius$4(diameter / 2, ...args);
const ofPoints = (points) =>
  Shape.fromGeometry(buildPolygonFromPoints(points)).toGraph();

const Polygon = (...args) => ofRadius$4(...args);

Polygon.ofEdge = ofEdge$1;
Polygon.ofApothem = ofApothem$3;
Polygon.ofRadius = ofRadius$4;
Polygon.ofDiameter = ofDiameter$3;
Polygon.ofPoints = ofPoints;
Polygon.toRadiusFromApothem = toRadiusFromApothem$1;

Shape.prototype.Polygon = shapeMethod(Polygon);

const ofEdge$2 = (edge = 1, { sides = 32 } = {}) =>
  Polygon.ofEdge(edge, { sides });

const ofRadius$5 = (radius = 1, { sides = 32 } = {}) =>
  Polygon.ofRadius(radius, { sides });

const ofApothem$4 = (apothem = 1, { sides = 32 } = {}) =>
  Polygon.ofApothem(apothem, { sides });

const ofDiameter$4 = (diameter = 1, { sides = 32 } = {}) =>
  Polygon.ofDiameter(diameter, { sides });

const Circle = (...args) => ofRadius$5(...args);

Circle.ofEdge = ofEdge$2;
Circle.ofApothem = ofApothem$4;
Circle.ofRadius = ofRadius$5;
Circle.ofDiameter = ofDiameter$4;
Circle.toRadiusFromApothem = (radius = 1, sides = 32) =>
  Polygon.toRadiusFromApothem(radius, sides);

Shape.prototype.Circle = shapeMethod(Circle);

const buildPrism$1 = (radius = 1, height = 1, sides = 32) =>
  Shape.fromGeometry(taggedSolid({}, buildRegularPrism(sides)))
    .toGraph()
    .scale(radius, radius, height);

const ofRadius$6 = (radius = 1, height = 1, { sides = 3 } = {}) =>
  buildPrism$1(radius, height, sides);
const ofDiameter$5 = (diameter = 1, ...args) =>
  ofRadius$6(diameter / 2, ...args);

const toPathFromSurface = (shape) => {
  for (const { surface, z0Surface } of getAnySurfaces(shape.toKeptGeometry())) {
    const anySurface = surface || z0Surface;
    for (const path of anySurface) {
      return path;
    }
  }
  return [];
};

const ofFunction$1 = (op, { resolution, cap = true, context } = {}) =>
  Shape.fromGeometry(
    taggedSolid({}, buildFromFunction(op, resolution, cap, context))
  );

const ofSlices$1 = (op, { slices = 2, cap = true } = {}) =>
  Shape.fromGeometry(
    taggedSolid(
      {},
      buildFromSlices((t) => toPathFromSurface(op(t)), slices, cap)
    )
  );

const Prism = (...args) => ofRadius$6(...args);

Prism.ofRadius = ofRadius$6;
Prism.ofDiameter = ofDiameter$5;
Prism.ofFunction = ofFunction$1;
Prism.ofSlices = ofSlices$1;

Shape.prototype.Prism = shapeMethod(Prism);

const ofRadius$7 = (radius = 1, height = 1, { sides = 32 } = {}) => {
  const fn = linear(1, 0);
  return Prism.ofSlices((t) =>
    Circle(fn(t) * radius, { sides }).moveZ(t * height)
  ).toGraph();
};

const ofDiameter$6 = (diameter, ...args) =>
  ofRadius$7(diameter / 2, ...args);
const ofApothem$5 = (apothem, ...args) =>
  ofRadius$7(toRadiusFromApothem$1(apothem), ...args);

const Cone = (...args) => ofRadius$7(...args);

Cone.ofRadius = ofRadius$7;
Cone.ofDiameter = ofDiameter$6;
Cone.ofApothem = ofApothem$5;

Shape.prototype.Cone = shapeMethod(Cone);

const Difference = (first, ...rest) => first.cut(...rest);

Shape.prototype.Difference = shapeMethod(Difference);

const Empty = (...shapes) =>
  Shape.fromGeometry(taggedDisjointAssembly({}));

Shape.prototype.Empty = shapeMethod(Empty);

const isDefined$1 = (value) => value;

const Group = (...shapes) =>
  Shape.fromGeometry(
    taggedLayers(
      {},
      ...shapes.filter(isDefined$1).map((shape) => shape.toGeometry())
    )
  );

Shape.prototype.Group = shapeMethod(Group);

// Hershey simplex one line font.
// See: http://paulbourke.net/dataformats/hershey/

const hersheyPaths = {
  32: [[null]],
  33: [
    [null, [5, 21, 0], [5, 7, 0]],
    [null, [5, 2, 0], [4, 1, 0], [5, 0, 0], [6, 1, 0], [5, 2, 0]],
    [null],
  ],
  34: [
    [null, [4, 21, 0], [4, 14, 0]],
    [null, [12, 21, 0], [12, 14, 0]],
    [null],
  ],
  35: [
    [null, [11, 25, 0], [4, -7, 0]],
    [null, [17, 25, 0], [10, -7, 0]],
    [null, [4, 12, 0], [18, 12, 0]],
    [null, [3, 6, 0], [17, 6, 0]],
    [null],
  ],
  36: [
    [null, [8, 25, 0], [8, -4, 0]],
    [null, [12, 25, 0], [12, -4, 0]],
    [
      null,
      [17, 18, 0],
      [15, 20, 0],
      [12, 21, 0],
      [8, 21, 0],
      [5, 20, 0],
      [3, 18, 0],
      [3, 16, 0],
      [4, 14, 0],
      [5, 13, 0],
      [7, 12, 0],
      [13, 10, 0],
      [15, 9, 0],
      [16, 8, 0],
      [17, 6, 0],
      [17, 3, 0],
      [15, 1, 0],
      [12, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [3, 3, 0],
    ],
    [null],
  ],
  37: [
    [null, [21, 21, 0], [3, 0, 0]],
    [
      null,
      [8, 21, 0],
      [10, 19, 0],
      [10, 17, 0],
      [9, 15, 0],
      [7, 14, 0],
      [5, 14, 0],
      [3, 16, 0],
      [3, 18, 0],
      [4, 20, 0],
      [6, 21, 0],
      [8, 21, 0],
      [10, 20, 0],
      [13, 19, 0],
      [16, 19, 0],
      [19, 20, 0],
      [21, 21, 0],
    ],
    [
      null,
      [17, 7, 0],
      [15, 6, 0],
      [14, 4, 0],
      [14, 2, 0],
      [16, 0, 0],
      [18, 0, 0],
      [20, 1, 0],
      [21, 3, 0],
      [21, 5, 0],
      [19, 7, 0],
      [17, 7, 0],
    ],
    [null],
  ],
  38: [
    [
      null,
      [23, 12, 0],
      [23, 13, 0],
      [22, 14, 0],
      [21, 14, 0],
      [20, 13, 0],
      [19, 11, 0],
      [17, 6, 0],
      [15, 3, 0],
      [13, 1, 0],
      [11, 0, 0],
      [7, 0, 0],
      [5, 1, 0],
      [4, 2, 0],
      [3, 4, 0],
      [3, 6, 0],
      [4, 8, 0],
      [5, 9, 0],
      [12, 13, 0],
      [13, 14, 0],
      [14, 16, 0],
      [14, 18, 0],
      [13, 20, 0],
      [11, 21, 0],
      [9, 20, 0],
      [8, 18, 0],
      [8, 16, 0],
      [9, 13, 0],
      [11, 10, 0],
      [16, 3, 0],
      [18, 1, 0],
      [20, 0, 0],
      [22, 0, 0],
      [23, 1, 0],
      [23, 2, 0],
    ],
    [null],
  ],
  39: [
    [
      null,
      [5, 19, 0],
      [4, 20, 0],
      [5, 21, 0],
      [6, 20, 0],
      [6, 18, 0],
      [5, 16, 0],
      [4, 15, 0],
    ],
    [null],
  ],
  40: [
    [
      null,
      [11, 25, 0],
      [9, 23, 0],
      [7, 20, 0],
      [5, 16, 0],
      [4, 11, 0],
      [4, 7, 0],
      [5, 2, 0],
      [7, -2, 0],
      [9, -5, 0],
      [11, -7, 0],
    ],
    [null],
  ],
  41: [
    [
      null,
      [3, 25, 0],
      [5, 23, 0],
      [7, 20, 0],
      [9, 16, 0],
      [10, 11, 0],
      [10, 7, 0],
      [9, 2, 0],
      [7, -2, 0],
      [5, -5, 0],
      [3, -7, 0],
    ],
    [null],
  ],
  42: [
    [null, [8, 21, 0], [8, 9, 0]],
    [null, [3, 18, 0], [13, 12, 0]],
    [null, [13, 18, 0], [3, 12, 0]],
    [null],
  ],
  43: [[null, [13, 18, 0], [13, 0, 0]], [null, [4, 9, 0], [22, 9, 0]], [null]],
  44: [
    [
      null,
      [6, 1, 0],
      [5, 0, 0],
      [4, 1, 0],
      [5, 2, 0],
      [6, 1, 0],
      [6, -1, 0],
      [5, -3, 0],
      [4, -4, 0],
    ],
    [null],
  ],
  45: [[null, [4, 9, 0], [22, 9, 0]], [null]],
  46: [[null, [5, 2, 0], [4, 1, 0], [5, 0, 0], [6, 1, 0], [5, 2, 0]], [null]],
  47: [[null, [20, 25, 0], [2, -7, 0]], [null]],
  48: [
    [
      null,
      [9, 21, 0],
      [6, 20, 0],
      [4, 17, 0],
      [3, 12, 0],
      [3, 9, 0],
      [4, 4, 0],
      [6, 1, 0],
      [9, 0, 0],
      [11, 0, 0],
      [14, 1, 0],
      [16, 4, 0],
      [17, 9, 0],
      [17, 12, 0],
      [16, 17, 0],
      [14, 20, 0],
      [11, 21, 0],
      [9, 21, 0],
    ],
    [null],
  ],
  49: [[null, [6, 17, 0], [8, 18, 0], [11, 21, 0], [11, 0, 0]], [null]],
  50: [
    [
      null,
      [4, 16, 0],
      [4, 17, 0],
      [5, 19, 0],
      [6, 20, 0],
      [8, 21, 0],
      [12, 21, 0],
      [14, 20, 0],
      [15, 19, 0],
      [16, 17, 0],
      [16, 15, 0],
      [15, 13, 0],
      [13, 10, 0],
      [3, 0, 0],
      [17, 0, 0],
    ],
    [null],
  ],
  51: [
    [
      null,
      [5, 21, 0],
      [16, 21, 0],
      [10, 13, 0],
      [13, 13, 0],
      [15, 12, 0],
      [16, 11, 0],
      [17, 8, 0],
      [17, 6, 0],
      [16, 3, 0],
      [14, 1, 0],
      [11, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [4, 2, 0],
      [3, 4, 0],
    ],
    [null],
  ],
  52: [
    [null, [13, 21, 0], [3, 7, 0], [18, 7, 0]],
    [null, [13, 21, 0], [13, 0, 0]],
    [null],
  ],
  53: [
    [
      null,
      [15, 21, 0],
      [5, 21, 0],
      [4, 12, 0],
      [5, 13, 0],
      [8, 14, 0],
      [11, 14, 0],
      [14, 13, 0],
      [16, 11, 0],
      [17, 8, 0],
      [17, 6, 0],
      [16, 3, 0],
      [14, 1, 0],
      [11, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [4, 2, 0],
      [3, 4, 0],
    ],
    [null],
  ],
  54: [
    [
      null,
      [16, 18, 0],
      [15, 20, 0],
      [12, 21, 0],
      [10, 21, 0],
      [7, 20, 0],
      [5, 17, 0],
      [4, 12, 0],
      [4, 7, 0],
      [5, 3, 0],
      [7, 1, 0],
      [10, 0, 0],
      [11, 0, 0],
      [14, 1, 0],
      [16, 3, 0],
      [17, 6, 0],
      [17, 7, 0],
      [16, 10, 0],
      [14, 12, 0],
      [11, 13, 0],
      [10, 13, 0],
      [7, 12, 0],
      [5, 10, 0],
      [4, 7, 0],
    ],
    [null],
  ],
  55: [[null, [17, 21, 0], [7, 0, 0]], [null, [3, 21, 0], [17, 21, 0]], [null]],
  56: [
    [
      null,
      [8, 21, 0],
      [5, 20, 0],
      [4, 18, 0],
      [4, 16, 0],
      [5, 14, 0],
      [7, 13, 0],
      [11, 12, 0],
      [14, 11, 0],
      [16, 9, 0],
      [17, 7, 0],
      [17, 4, 0],
      [16, 2, 0],
      [15, 1, 0],
      [12, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [4, 2, 0],
      [3, 4, 0],
      [3, 7, 0],
      [4, 9, 0],
      [6, 11, 0],
      [9, 12, 0],
      [13, 13, 0],
      [15, 14, 0],
      [16, 16, 0],
      [16, 18, 0],
      [15, 20, 0],
      [12, 21, 0],
      [8, 21, 0],
    ],
    [null],
  ],
  57: [
    [
      null,
      [16, 14, 0],
      [15, 11, 0],
      [13, 9, 0],
      [10, 8, 0],
      [9, 8, 0],
      [6, 9, 0],
      [4, 11, 0],
      [3, 14, 0],
      [3, 15, 0],
      [4, 18, 0],
      [6, 20, 0],
      [9, 21, 0],
      [10, 21, 0],
      [13, 20, 0],
      [15, 18, 0],
      [16, 14, 0],
      [16, 9, 0],
      [15, 4, 0],
      [13, 1, 0],
      [10, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [4, 3, 0],
    ],
    [null],
  ],
  58: [
    [null, [5, 14, 0], [4, 13, 0], [5, 12, 0], [6, 13, 0], [5, 14, 0]],
    [null, [5, 2, 0], [4, 1, 0], [5, 0, 0], [6, 1, 0], [5, 2, 0]],
    [null],
  ],
  59: [
    [null, [5, 14, 0], [4, 13, 0], [5, 12, 0], [6, 13, 0], [5, 14, 0]],
    [
      null,
      [6, 1, 0],
      [5, 0, 0],
      [4, 1, 0],
      [5, 2, 0],
      [6, 1, 0],
      [6, -1, 0],
      [5, -3, 0],
      [4, -4, 0],
    ],
    [null],
  ],
  60: [[null, [20, 18, 0], [4, 9, 0], [20, 0, 0]], [null]],
  61: [[null, [4, 12, 0], [22, 12, 0]], [null, [4, 6, 0], [22, 6, 0]], [null]],
  62: [[null, [4, 18, 0], [20, 9, 0], [4, 0, 0]], [null]],
  63: [
    [
      null,
      [3, 16, 0],
      [3, 17, 0],
      [4, 19, 0],
      [5, 20, 0],
      [7, 21, 0],
      [11, 21, 0],
      [13, 20, 0],
      [14, 19, 0],
      [15, 17, 0],
      [15, 15, 0],
      [14, 13, 0],
      [13, 12, 0],
      [9, 10, 0],
      [9, 7, 0],
    ],
    [null, [9, 2, 0], [8, 1, 0], [9, 0, 0], [10, 1, 0], [9, 2, 0]],
    [null],
  ],
  64: [
    [
      null,
      [18, 13, 0],
      [17, 15, 0],
      [15, 16, 0],
      [12, 16, 0],
      [10, 15, 0],
      [9, 14, 0],
      [8, 11, 0],
      [8, 8, 0],
      [9, 6, 0],
      [11, 5, 0],
      [14, 5, 0],
      [16, 6, 0],
      [17, 8, 0],
    ],
    [
      null,
      [12, 16, 0],
      [10, 14, 0],
      [9, 11, 0],
      [9, 8, 0],
      [10, 6, 0],
      [11, 5, 0],
    ],
    [
      null,
      [18, 16, 0],
      [17, 8, 0],
      [17, 6, 0],
      [19, 5, 0],
      [21, 5, 0],
      [23, 7, 0],
      [24, 10, 0],
      [24, 12, 0],
      [23, 15, 0],
      [22, 17, 0],
      [20, 19, 0],
      [18, 20, 0],
      [15, 21, 0],
      [12, 21, 0],
      [9, 20, 0],
      [7, 19, 0],
      [5, 17, 0],
      [4, 15, 0],
      [3, 12, 0],
      [3, 9, 0],
      [4, 6, 0],
      [5, 4, 0],
      [7, 2, 0],
      [9, 1, 0],
      [12, 0, 0],
      [15, 0, 0],
      [18, 1, 0],
      [20, 2, 0],
      [21, 3, 0],
    ],
    [null, [19, 16, 0], [18, 8, 0], [18, 6, 0], [19, 5, 0]],
  ],
  65: [
    [null, [9, 21, 0], [1, 0, 0]],
    [null, [9, 21, 0], [17, 0, 0]],
    [null, [4, 7, 0], [14, 7, 0]],
    [null],
  ],
  66: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 21, 0],
      [13, 21, 0],
      [16, 20, 0],
      [17, 19, 0],
      [18, 17, 0],
      [18, 15, 0],
      [17, 13, 0],
      [16, 12, 0],
      [13, 11, 0],
    ],
    [
      null,
      [4, 11, 0],
      [13, 11, 0],
      [16, 10, 0],
      [17, 9, 0],
      [18, 7, 0],
      [18, 4, 0],
      [17, 2, 0],
      [16, 1, 0],
      [13, 0, 0],
      [4, 0, 0],
    ],
    [null],
  ],
  67: [
    [
      null,
      [18, 16, 0],
      [17, 18, 0],
      [15, 20, 0],
      [13, 21, 0],
      [9, 21, 0],
      [7, 20, 0],
      [5, 18, 0],
      [4, 16, 0],
      [3, 13, 0],
      [3, 8, 0],
      [4, 5, 0],
      [5, 3, 0],
      [7, 1, 0],
      [9, 0, 0],
      [13, 0, 0],
      [15, 1, 0],
      [17, 3, 0],
      [18, 5, 0],
    ],
    [null],
  ],
  68: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 21, 0],
      [11, 21, 0],
      [14, 20, 0],
      [16, 18, 0],
      [17, 16, 0],
      [18, 13, 0],
      [18, 8, 0],
      [17, 5, 0],
      [16, 3, 0],
      [14, 1, 0],
      [11, 0, 0],
      [4, 0, 0],
    ],
    [null],
  ],
  69: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [4, 21, 0], [17, 21, 0]],
    [null, [4, 11, 0], [12, 11, 0]],
    [null, [4, 0, 0], [17, 0, 0]],
    [null],
  ],
  70: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [4, 21, 0], [17, 21, 0]],
    [null, [4, 11, 0], [12, 11, 0]],
    [null],
  ],
  71: [
    [
      null,
      [18, 16, 0],
      [17, 18, 0],
      [15, 20, 0],
      [13, 21, 0],
      [9, 21, 0],
      [7, 20, 0],
      [5, 18, 0],
      [4, 16, 0],
      [3, 13, 0],
      [3, 8, 0],
      [4, 5, 0],
      [5, 3, 0],
      [7, 1, 0],
      [9, 0, 0],
      [13, 0, 0],
      [15, 1, 0],
      [17, 3, 0],
      [18, 5, 0],
      [18, 8, 0],
    ],
    [null, [13, 8, 0], [18, 8, 0]],
    [null],
  ],
  72: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [18, 21, 0], [18, 0, 0]],
    [null, [4, 11, 0], [18, 11, 0]],
    [null],
  ],
  73: [[null, [4, 21, 0], [4, 0, 0]], [null]],
  74: [
    [
      null,
      [12, 21, 0],
      [12, 5, 0],
      [11, 2, 0],
      [10, 1, 0],
      [8, 0, 0],
      [6, 0, 0],
      [4, 1, 0],
      [3, 2, 0],
      [2, 5, 0],
      [2, 7, 0],
    ],
    [null],
  ],
  75: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [18, 21, 0], [4, 7, 0]],
    [null, [9, 12, 0], [18, 0, 0]],
    [null],
  ],
  76: [[null, [4, 21, 0], [4, 0, 0]], [null, [4, 0, 0], [16, 0, 0]], [null]],
  77: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [4, 21, 0], [12, 0, 0]],
    [null, [20, 21, 0], [12, 0, 0]],
    [null, [20, 21, 0], [20, 0, 0]],
    [null],
  ],
  78: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [4, 21, 0], [18, 0, 0]],
    [null, [18, 21, 0], [18, 0, 0]],
    [null],
  ],
  79: [
    [
      null,
      [9, 21, 0],
      [7, 20, 0],
      [5, 18, 0],
      [4, 16, 0],
      [3, 13, 0],
      [3, 8, 0],
      [4, 5, 0],
      [5, 3, 0],
      [7, 1, 0],
      [9, 0, 0],
      [13, 0, 0],
      [15, 1, 0],
      [17, 3, 0],
      [18, 5, 0],
      [19, 8, 0],
      [19, 13, 0],
      [18, 16, 0],
      [17, 18, 0],
      [15, 20, 0],
      [13, 21, 0],
      [9, 21, 0],
    ],
    [null],
  ],
  80: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 21, 0],
      [13, 21, 0],
      [16, 20, 0],
      [17, 19, 0],
      [18, 17, 0],
      [18, 14, 0],
      [17, 12, 0],
      [16, 11, 0],
      [13, 10, 0],
      [4, 10, 0],
    ],
    [null],
  ],
  81: [
    [
      null,
      [9, 21, 0],
      [7, 20, 0],
      [5, 18, 0],
      [4, 16, 0],
      [3, 13, 0],
      [3, 8, 0],
      [4, 5, 0],
      [5, 3, 0],
      [7, 1, 0],
      [9, 0, 0],
      [13, 0, 0],
      [15, 1, 0],
      [17, 3, 0],
      [18, 5, 0],
      [19, 8, 0],
      [19, 13, 0],
      [18, 16, 0],
      [17, 18, 0],
      [15, 20, 0],
      [13, 21, 0],
      [9, 21, 0],
    ],
    [null, [12, 4, 0], [18, -2, 0]],
    [null],
  ],
  82: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 21, 0],
      [13, 21, 0],
      [16, 20, 0],
      [17, 19, 0],
      [18, 17, 0],
      [18, 15, 0],
      [17, 13, 0],
      [16, 12, 0],
      [13, 11, 0],
      [4, 11, 0],
    ],
    [null, [11, 11, 0], [18, 0, 0]],
    [null],
  ],
  83: [
    [
      null,
      [17, 18, 0],
      [15, 20, 0],
      [12, 21, 0],
      [8, 21, 0],
      [5, 20, 0],
      [3, 18, 0],
      [3, 16, 0],
      [4, 14, 0],
      [5, 13, 0],
      [7, 12, 0],
      [13, 10, 0],
      [15, 9, 0],
      [16, 8, 0],
      [17, 6, 0],
      [17, 3, 0],
      [15, 1, 0],
      [12, 0, 0],
      [8, 0, 0],
      [5, 1, 0],
      [3, 3, 0],
    ],
    [null],
  ],
  84: [[null, [8, 21, 0], [8, 0, 0]], [null, [1, 21, 0], [15, 21, 0]], [null]],
  85: [
    [
      null,
      [4, 21, 0],
      [4, 6, 0],
      [5, 3, 0],
      [7, 1, 0],
      [10, 0, 0],
      [12, 0, 0],
      [15, 1, 0],
      [17, 3, 0],
      [18, 6, 0],
      [18, 21, 0],
    ],
    [null],
  ],
  86: [[null, [1, 21, 0], [9, 0, 0]], [null, [17, 21, 0], [9, 0, 0]], [null]],
  87: [
    [null, [2, 21, 0], [7, 0, 0]],
    [null, [12, 21, 0], [7, 0, 0]],
    [null, [12, 21, 0], [17, 0, 0]],
    [null, [22, 21, 0], [17, 0, 0]],
    [null],
  ],
  88: [[null, [3, 21, 0], [17, 0, 0]], [null, [17, 21, 0], [3, 0, 0]], [null]],
  89: [
    [null, [1, 21, 0], [9, 11, 0], [9, 0, 0]],
    [null, [17, 21, 0], [9, 11, 0]],
    [null],
  ],
  90: [
    [null, [17, 21, 0], [3, 0, 0]],
    [null, [3, 21, 0], [17, 21, 0]],
    [null, [3, 0, 0], [17, 0, 0]],
    [null],
  ],
  91: [
    [null, [4, 25, 0], [4, -7, 0]],
    [null, [5, 25, 0], [5, -7, 0]],
    [null, [4, 25, 0], [11, 25, 0]],
    [null, [4, -7, 0], [11, -7, 0]],
    [null],
  ],
  92: [[null, [0, 21, 0], [14, -3, 0]], [null]],
  93: [
    [null, [9, 25, 0], [9, -7, 0]],
    [null, [10, 25, 0], [10, -7, 0]],
    [null, [3, 25, 0], [10, 25, 0]],
    [null, [3, -7, 0], [10, -7, 0]],
    [null],
  ],
  94: [
    [null, [6, 15, 0], [8, 18, 0], [10, 15, 0]],
    [null, [3, 12, 0], [8, 17, 0], [13, 12, 0]],
    [null, [8, 17, 0], [8, 0, 0]],
    [null],
  ],
  95: [[null, [0, -2, 0], [16, -2, 0]], [null]],
  96: [
    [
      null,
      [6, 21, 0],
      [5, 20, 0],
      [4, 18, 0],
      [4, 16, 0],
      [5, 15, 0],
      [6, 16, 0],
      [5, 17, 0],
    ],
    [null],
  ],
  97: [
    [null, [15, 14, 0], [15, 0, 0]],
    [
      null,
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  98: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 11, 0],
      [6, 13, 0],
      [8, 14, 0],
      [11, 14, 0],
      [13, 13, 0],
      [15, 11, 0],
      [16, 8, 0],
      [16, 6, 0],
      [15, 3, 0],
      [13, 1, 0],
      [11, 0, 0],
      [8, 0, 0],
      [6, 1, 0],
      [4, 3, 0],
    ],
    [null],
  ],
  99: [
    [
      null,
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  100: [
    [null, [15, 21, 0], [15, 0, 0]],
    [
      null,
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  101: [
    [
      null,
      [3, 8, 0],
      [15, 8, 0],
      [15, 10, 0],
      [14, 12, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  102: [
    [null, [10, 21, 0], [8, 21, 0], [6, 20, 0], [5, 17, 0], [5, 0, 0]],
    [null, [2, 14, 0], [9, 14, 0]],
    [null],
  ],
  103: [
    [
      null,
      [15, 14, 0],
      [15, -2, 0],
      [14, -5, 0],
      [13, -6, 0],
      [11, -7, 0],
      [8, -7, 0],
      [6, -6, 0],
    ],
    [
      null,
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  104: [
    [null, [4, 21, 0], [4, 0, 0]],
    [
      null,
      [4, 10, 0],
      [7, 13, 0],
      [9, 14, 0],
      [12, 14, 0],
      [14, 13, 0],
      [15, 10, 0],
      [15, 0, 0],
    ],
    [null],
  ],
  105: [
    [null, [3, 21, 0], [4, 20, 0], [5, 21, 0], [4, 22, 0], [3, 21, 0]],
    [null, [4, 14, 0], [4, 0, 0]],
    [null],
  ],
  106: [
    [null, [5, 21, 0], [6, 20, 0], [7, 21, 0], [6, 22, 0], [5, 21, 0]],
    [null, [6, 14, 0], [6, -3, 0], [5, -6, 0], [3, -7, 0], [1, -7, 0]],
    [null],
  ],
  107: [
    [null, [4, 21, 0], [4, 0, 0]],
    [null, [14, 14, 0], [4, 4, 0]],
    [null, [8, 8, 0], [15, 0, 0]],
    [null],
  ],
  108: [[null, [4, 21, 0], [4, 0, 0]], [null]],
  109: [
    [null, [4, 14, 0], [4, 0, 0]],
    [
      null,
      [4, 10, 0],
      [7, 13, 0],
      [9, 14, 0],
      [12, 14, 0],
      [14, 13, 0],
      [15, 10, 0],
      [15, 0, 0],
    ],
    [
      null,
      [15, 10, 0],
      [18, 13, 0],
      [20, 14, 0],
      [23, 14, 0],
      [25, 13, 0],
      [26, 10, 0],
      [26, 0, 0],
    ],
    [null],
  ],
  110: [
    [null, [4, 14, 0], [4, 0, 0]],
    [
      null,
      [4, 10, 0],
      [7, 13, 0],
      [9, 14, 0],
      [12, 14, 0],
      [14, 13, 0],
      [15, 10, 0],
      [15, 0, 0],
    ],
    [null],
  ],
  111: [
    [
      null,
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
      [16, 6, 0],
      [16, 8, 0],
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
    ],
    [null],
  ],
  112: [
    [null, [4, 14, 0], [4, -7, 0]],
    [
      null,
      [4, 11, 0],
      [6, 13, 0],
      [8, 14, 0],
      [11, 14, 0],
      [13, 13, 0],
      [15, 11, 0],
      [16, 8, 0],
      [16, 6, 0],
      [15, 3, 0],
      [13, 1, 0],
      [11, 0, 0],
      [8, 0, 0],
      [6, 1, 0],
      [4, 3, 0],
    ],
    [null],
  ],
  113: [
    [null, [15, 14, 0], [15, -7, 0]],
    [
      null,
      [15, 11, 0],
      [13, 13, 0],
      [11, 14, 0],
      [8, 14, 0],
      [6, 13, 0],
      [4, 11, 0],
      [3, 8, 0],
      [3, 6, 0],
      [4, 3, 0],
      [6, 1, 0],
      [8, 0, 0],
      [11, 0, 0],
      [13, 1, 0],
      [15, 3, 0],
    ],
    [null],
  ],
  114: [
    [null, [4, 14, 0], [4, 0, 0]],
    [null, [4, 8, 0], [5, 11, 0], [7, 13, 0], [9, 14, 0], [12, 14, 0]],
    [null],
  ],
  115: [
    [
      null,
      [14, 11, 0],
      [13, 13, 0],
      [10, 14, 0],
      [7, 14, 0],
      [4, 13, 0],
      [3, 11, 0],
      [4, 9, 0],
      [6, 8, 0],
      [11, 7, 0],
      [13, 6, 0],
      [14, 4, 0],
      [14, 3, 0],
      [13, 1, 0],
      [10, 0, 0],
      [7, 0, 0],
      [4, 1, 0],
      [3, 3, 0],
    ],
    [null],
  ],
  116: [
    [null, [5, 21, 0], [5, 4, 0], [6, 1, 0], [8, 0, 0], [10, 0, 0]],
    [null, [2, 14, 0], [9, 14, 0]],
    [null],
  ],
  117: [
    [
      null,
      [4, 14, 0],
      [4, 4, 0],
      [5, 1, 0],
      [7, 0, 0],
      [10, 0, 0],
      [12, 1, 0],
      [15, 4, 0],
    ],
    [null, [15, 14, 0], [15, 0, 0]],
    [null],
  ],
  118: [[null, [2, 14, 0], [8, 0, 0]], [null, [14, 14, 0], [8, 0, 0]], [null]],
  119: [
    [null, [3, 14, 0], [7, 0, 0]],
    [null, [11, 14, 0], [7, 0, 0]],
    [null, [11, 14, 0], [15, 0, 0]],
    [null, [19, 14, 0], [15, 0, 0]],
    [null],
  ],
  120: [[null, [3, 14, 0], [14, 0, 0]], [null, [14, 14, 0], [3, 0, 0]], [null]],
  121: [
    [null, [2, 14, 0], [8, 0, 0]],
    [
      null,
      [14, 14, 0],
      [8, 0, 0],
      [6, -4, 0],
      [4, -6, 0],
      [2, -7, 0],
      [1, -7, 0],
    ],
    [null],
  ],
  122: [
    [null, [14, 14, 0], [3, 0, 0]],
    [null, [3, 14, 0], [14, 14, 0]],
    [null, [3, 0, 0], [14, 0, 0]],
    [null],
  ],
  123: [
    [
      null,
      [9, 25, 0],
      [7, 24, 0],
      [6, 23, 0],
      [5, 21, 0],
      [5, 19, 0],
      [6, 17, 0],
      [7, 16, 0],
      [8, 14, 0],
      [8, 12, 0],
      [6, 10, 0],
    ],
    [
      null,
      [7, 24, 0],
      [6, 22, 0],
      [6, 20, 0],
      [7, 18, 0],
      [8, 17, 0],
      [9, 15, 0],
      [9, 13, 0],
      [8, 11, 0],
      [4, 9, 0],
      [8, 7, 0],
      [9, 5, 0],
      [9, 3, 0],
      [8, 1, 0],
      [7, 0, 0],
      [6, -2, 0],
      [6, -4, 0],
      [7, -6, 0],
    ],
    [
      null,
      [6, 8, 0],
      [8, 6, 0],
      [8, 4, 0],
      [7, 2, 0],
      [6, 1, 0],
      [5, -1, 0],
      [5, -3, 0],
      [6, -5, 0],
      [7, -6, 0],
      [9, -7, 0],
    ],
    [null],
  ],
  124: [[null, [4, 25, 0], [4, -7, 0]], [null]],
  125: [
    [
      null,
      [5, 25, 0],
      [7, 24, 0],
      [8, 23, 0],
      [9, 21, 0],
      [9, 19, 0],
      [8, 17, 0],
      [7, 16, 0],
      [6, 14, 0],
      [6, 12, 0],
      [8, 10, 0],
    ],
    [
      null,
      [7, 24, 0],
      [8, 22, 0],
      [8, 20, 0],
      [7, 18, 0],
      [6, 17, 0],
      [5, 15, 0],
      [5, 13, 0],
      [6, 11, 0],
      [10, 9, 0],
      [6, 7, 0],
      [5, 5, 0],
      [5, 3, 0],
      [6, 1, 0],
      [7, 0, 0],
      [8, -2, 0],
      [8, -4, 0],
      [7, -6, 0],
    ],
    [
      null,
      [8, 8, 0],
      [6, 6, 0],
      [6, 4, 0],
      [7, 2, 0],
      [8, 1, 0],
      [9, -1, 0],
      [9, -3, 0],
      [8, -5, 0],
      [7, -6, 0],
      [5, -7, 0],
    ],
    [null],
  ],
  126: [
    [
      null,
      [3, 6, 0],
      [3, 8, 0],
      [4, 11, 0],
      [6, 12, 0],
      [8, 12, 0],
      [10, 11, 0],
      [14, 8, 0],
      [16, 7, 0],
      [18, 7, 0],
      [20, 8, 0],
      [21, 10, 0],
    ],
    [
      null,
      [3, 8, 0],
      [4, 10, 0],
      [6, 11, 0],
      [8, 11, 0],
      [10, 10, 0],
      [14, 7, 0],
      [16, 6, 0],
      [18, 6, 0],
      [20, 7, 0],
      [21, 10, 0],
      [21, 12, 0],
    ],
    [null],
  ],
};

const hersheyWidth = {
  32: 16,
  33: 10,
  34: 16,
  35: 21,
  36: 20,
  37: 24,
  38: 26,
  39: 10,
  40: 14,
  41: 14,
  42: 16,
  43: 26,
  44: 10,
  45: 26,
  46: 10,
  47: 22,
  48: 20,
  49: 20,
  50: 20,
  51: 20,
  52: 20,
  53: 20,
  54: 20,
  55: 20,
  56: 20,
  57: 20,
  58: 10,
  59: 10,
  60: 24,
  61: 26,
  62: 24,
  63: 18,
  64: 27,
  65: 18,
  66: 21,
  67: 21,
  68: 21,
  69: 19,
  70: 18,
  71: 21,
  72: 22,
  73: 8,
  74: 16,
  75: 21,
  76: 17,
  77: 24,
  78: 22,
  79: 22,
  80: 21,
  81: 22,
  82: 21,
  83: 20,
  84: 16,
  85: 22,
  86: 18,
  87: 24,
  88: 20,
  89: 18,
  90: 20,
  91: 14,
  92: 14,
  93: 14,
  94: 16,
  95: 16,
  96: 10,
  97: 19,
  98: 19,
  99: 18,
  100: 19,
  101: 18,
  102: 12,
  103: 19,
  104: 19,
  105: 8,
  106: 10,
  107: 17,
  108: 8,
  109: 30,
  110: 19,
  111: 19,
  112: 19,
  113: 19,
  114: 13,
  115: 17,
  116: 12,
  117: 19,
  118: 16,
  119: 22,
  120: 17,
  121: 16,
  122: 17,
  123: 14,
  124: 8,
  125: 14,
  126: 24,
};

const toPaths = (letters) => {
  let xOffset = 0;
  const mergedPaths = [];
  for (const letter of letters) {
    const code = letter.charCodeAt(0);
    const paths = hersheyPaths[code] || [];
    mergedPaths.push(...translate([xOffset, 0, 0], paths));
    xOffset += hersheyWidth[code] || 0;
  }
  return Shape$1.fromGeometry({ type: 'paths', paths: mergedPaths }).scale(
    1 / 28
  );
};

const ofSize$1 = (size) => (text) => toPaths(text).scale(size);

const Hershey = (size) => ofSize$1(size);
Hershey.ofSize = ofSize$1;
Hershey.toPaths = toPaths;

const ofEdge$3 = (edge = 1) => Polygon.ofEdge(edge, { sides: 6 });
const ofApothem$6 = (apothem = 1) =>
  Polygon.ofApothem(apothem, { sides: 6 });
const ofRadius$8 = (radius = 1) => Polygon.ofRadius(radius, { sides: 6 });
const ofDiameter$7 = (diameter = 1) =>
  Polygon.ofDiameter(diameter, { sides: 6 });

const Hexagon = (...args) => ofRadius$8(...args);

Hexagon.ofRadius = ofRadius$8;
Hexagon.ofEdge = ofEdge$3;
Hexagon.ofApothem = ofApothem$6;
Hexagon.ofRadius = ofRadius$8;
Hexagon.ofDiameter = ofDiameter$7;

Shape.prototype.Hexagon = shapeMethod(Hexagon);

const unitIcosahedron = () =>
  Shape.fromPolygonsToSolid(buildRegularIcosahedron({})).toGraph();

const ofRadius$9 = (radius = 1) => unitIcosahedron().scale(radius);
const ofDiameter$8 = (diameter = 1) =>
  unitIcosahedron().scale(diameter / 2);
const Icosahedron = (...args) => ofRadius$9(...args);

Icosahedron.ofRadius = ofRadius$9;
Icosahedron.ofDiameter = ofDiameter$8;

Shape.prototype.Icosahedron = shapeMethod(Icosahedron);

const Intersection = (first, ...rest) => first.clip(...rest);

Shape.prototype.Intersection = shapeMethod(Intersection);

const fromVec3 = (...points) =>
  Shape.fromOpenPath(points.map(([x = 0, y = 0, z = 0]) => [x, y, z]));

const fromPoints = (...shapes) => {
  const vec3List = [];
  for (const shape of shapes) {
    shape.eachPoint((vec3) => vec3List.push(vec3));
  }
  return fromVec3(...vec3List);
};

const Path = (...points) => fromPoints(...points);
Path.fromVec3 = fromVec3;

Shape.prototype.Path = shapeMethod(Path);

const fromPoint = ([x = 0, y = 0, z = 0]) => Shape.fromPoint([x, y, z]);
const Point = (...args) => fromPoint([...args]);
Point.fromPoint = fromPoint;

Shape.prototype.Point = shapeMethod(Point);

const Line = (length) => Path(Point(0), Point(length));

Shape.prototype.Line = shapeMethod(Line);

const X = 0;
const Y = 1;
const Z = 2;

const Peg = (
  origin = [0, 0, 0],
  forward = [0, 1, 0],
  right = [1, 0, 0]
) => {
  const o = origin;
  const f = add(origin, forward);
  const r = add(origin, right);
  return Shape.fromGeometry(
    taggedPoints({ tags: ['peg'] }, [
      [o[X], o[Y], o[Z], f[X], f[Y], f[Z], r[X], r[Y], r[Z]],
    ])
  );
};

Shape.prototype.Peg = shapeMethod(Peg);

// These are just excessively large polygons, which approximate planes.
const Plane = (x = 0, y = 0, z = 1, w = 0) =>
  Shape.fromPathToSurface(toPolygon([x, y, z, w]));

Shape.prototype.Plane = shapeMethod(Plane);

const fromPoints$1 = (...args) =>
  Shape.fromPoints(args.map(([x = 0, y = 0, z = 0]) => [x, y, z]));

const Points = (...args) => fromPoints$1(...args);
Points.fromPoints = fromPoints$1;

Shape.prototype.Points = shapeMethod(Points);

const ofPointPaths = (points = [], paths = []) => {
  const polygons = [];
  for (const path of paths) {
    polygons.push(path.map((point) => points[point]));
  }
  return Shape.fromPolygonsToSolid(polygons).toGraph();
};

const Polyhedron = (...args) => ofPointPaths(...args);

Polyhedron.ofPointPaths = ofPointPaths;

Shape.prototype.Polyhedron = shapeMethod(Polyhedron);

// FIX: This name is confusing wrt Shape.sketch().
const Sketch = (shape) => shape.sketch();

Shape.prototype.Sketch = shapeMethod(Sketch);

const toRadiusFromApothem = (apothem) => apothem / Math.cos(Math.PI / 4);

const edgeScale$1 = regularPolygonEdgeLengthToRadius(1, 4);
const unitSquare = () =>
  Shape.fromGeometry(taggedZ0Surface({}, [buildRegularPolygon(4)]))
    .toGraph()
    .rotateZ(45)
    .scale(edgeScale$1);

const ofSize$2 = (width = 1, length) =>
  unitSquare().scale(width, length, 1);
const ofRadius$a = (radius) =>
  Shape.fromGeometry(taggedZ0Surface({}, [buildRegularPolygon(4)]))
    .toGraph()
    .rotateZ(45)
    .scale(radius);
const ofApothem$7 = (apothem) => ofRadius$a(toRadiusFromApothem(apothem));
const ofDiameter$9 = (diameter) => ofRadius$a(diameter / 2);

const fromCorners$1 = (corner1, corner2) => {
  const [c1x, c1y] = corner1;
  const [c2x, c2y] = corner2;
  const length = c2x - c1x;
  const width = c2y - c1y;
  const center = [(c1x + c2x) / 2, (c1y + c2y) / 2];
  return unitSquare().scale(length, width, 1).translate(center);
};

const Square = (...args) => ofSize$2(...args);

Square.ofSize = ofSize$2;
Square.ofRadius = ofRadius$a;
Square.ofApothem = ofApothem$7;
Square.ofDiameter = ofDiameter$9;
Square.fromCorners = fromCorners$1;

Shape.prototype.Square = shapeMethod(Square);

const unitTetrahedron = () =>
  Shape.fromGeometry(taggedSolid({}, buildRegularTetrahedron({}))).toGraph();

const ofRadius$b = (radius = 1) => unitTetrahedron().scale(radius);
const ofDiameter$a = (diameter = 1) =>
  unitTetrahedron().scale(diameter / 2);

const Tetrahedron = (...args) => ofRadius$b(...args);

Tetrahedron.ofRadius = ofRadius$b;
Tetrahedron.ofDiameter = ofDiameter$a;

Shape.prototype.Tetrahedron = shapeMethod(Tetrahedron);

const Toolpath = (...points) =>
  Path(...points).setTags(['path/Toolpath']);

Shape.prototype.Toolpath = shapeMethod(Toolpath);

const Torus = (
  radius = 1,
  height = 1,
  { segments = 32, sides = 32, rotation = 0 } = {}
) =>
  Circle(height / 2, { sides })
    .rotateZ(rotation)
    .moveY(radius)
    .Loop(360, { sides: segments })
    .rotateY(90)
    .toGraph();

Shape.prototype.Torus = shapeMethod(Torus);

const ofEdge$4 = (edge = 1) => Polygon.ofEdge(edge, { sides: 3 });
const ofApothem$8 = (apothem = 1) =>
  Polygon.ofApothem(apothem, { sides: 3 });
const ofRadius$c = (radius = 1) => Polygon.ofRadius(radius, { sides: 3 });
const ofDiameter$b = (diameter = 1) =>
  Polygon.ofDiameter(diameter, { sides: 3 });

const Triangle = (...args) => ofEdge$4(...args);

Triangle.ofEdge = ofEdge$4;
Triangle.ofApothem = ofApothem$8;
Triangle.ofRadius = ofRadius$c;
Triangle.ofDiameter = ofDiameter$b;

Shape.prototype.Triangle = shapeMethod(Triangle);

const Union = (first, ...rest) => {
  if (first === undefined) {
    return Empty();
  } else {
    return first.add(...rest);
  }
};

Shape.prototype.Union = shapeMethod(Union);

const Wave = (
  toPathFromXDistance = (xDistance) => [[0]],
  { from = 0, to = 360, by, resolution } = {}
) => {
  if (by === undefined && resolution === undefined) {
    by = 1;
  }
  let path = [null];
  for (const xDistance of numbers((distance) => distance, { from, to, by })) {
    const subpath = toPathFromXDistance(xDistance);
    path = concatenate(path, translate$1([xDistance, 0, 0], subpath));
  }
  return Shape.fromPath(path);
};

Shape.prototype.Wave = shapeMethod(Wave);

const api = {
  Arc,
  Assembly,
  Ball,
  Box,
  BoxOfApothem,
  BoxOfCorners,
  BoxOfDiameter,
  BoxOfRadius,
  BoxOfEdge,
  BoxOfSize,
  Circle,
  Cone,
  Difference,
  Empty,
  Group,
  Hershey,
  Hexagon,
  Icosahedron,
  Intersection,
  Line,
  Path,
  Peg,
  Plane,
  Point,
  Points,
  Polygon,
  Polyhedron,
  Prism,
  Rod,
  RodOfApothem,
  RodOfDiameter,
  RodOfFunction,
  RodOfRadius,
  RodOfSlices,
  Sketch,
  Spiral,
  Square,
  Tetrahedron,
  Toolpath,
  Torus,
  Triangle,
  Union,
  Wave,
};

export default api;
export { Arc, Assembly, Ball, BallOfApothem, BallOfDiameter, BallOfRadius, Box, BoxOfApothem, BoxOfCorners, BoxOfDiameter, BoxOfEdge, BoxOfRadius, BoxOfSize, Circle, Cone, Difference, Empty, Group, Hershey, Hexagon, Icosahedron, Intersection, Line, Path, Peg, Plane, Point, Points, Polygon, Polyhedron, Prism, Rod, RodOfApothem, RodOfDiameter, RodOfFunction, RodOfRadius, RodOfSlices, Sketch, Spiral, Square, Tetrahedron, Toolpath, Torus, Triangle, Union, Wave };
