import { close, concatenate, open } from './jsxcad-geometry-path.js';
import { eachPoint, flip, toDisjointGeometry, toKeptGeometry as toKeptGeometry$1, toTransformedGeometry, toPoints, transform, fromPathToSurface, fromPathToZ0Surface, fromPathsToSurface, fromPathsToZ0Surface, rewriteTags, union as union$1, intersection as intersection$1, difference as difference$1, assemble as assemble$1, getSolids, drop as drop$1, getSurfaces, getZ0Surfaces, canonicalize as canonicalize$1, measureBoundingBox as measureBoundingBox$1, allTags, keep as keep$1, nonNegative } from './jsxcad-geometry-tagged.js';
import { fromPolygons, findOpenEdges, alignVertices } from './jsxcad-geometry-solid.js';
import { scale as scale$1, add, negate, normalize, subtract, dot, cross, distance } from './jsxcad-math-vec3.js';
import { toTagFromName } from './jsxcad-algorithm-color.js';
import { log as log$1, writeFile, readFile, getSources } from './jsxcad-sys.js';
import { fromTranslation, fromRotation, fromXRotation, fromYRotation, fromZRotation, fromScaling } from './jsxcad-math-mat4.js';

class Shape {
  close () {
    const geometry = this.toKeptGeometry();
    if (!isSingleOpenPath(geometry)) {
      throw Error('Close requires a single open path.');
    }
    return Shape.fromClosedPath(close(geometry.paths[0]));
  }

  concat (...shapes) {
    const paths = [];
    for (const shape of [this, ...shapes]) {
      const geometry = shape.toKeptGeometry();
      if (!isSingleOpenPath(geometry)) {
        throw Error('Concatenation requires single open paths.');
      }
      paths.push(geometry.paths[0]);
    }
    return Shape.fromOpenPath(concatenate(...paths));
  }

  constructor (geometry = fromGeometry({ assembly: [] }),
               context) {
    if (geometry.geometry) {
      throw Error('die');
    }
    this.geometry = geometry;
    this.context = context;
  }

  eachPoint (operation) {
    eachPoint(operation, this.toKeptGeometry());
  }

  flip () {
    return fromGeometry(flip(toKeptGeometry(this)), this.context);
  }

  op (op, ...args) {
    return op(this, ...args);
  }

  setTags (tags) {
    return fromGeometry({ ...toGeometry(this), tags }, this.context);
  }

  toDisjointGeometry (options = {}) {
    return toDisjointGeometry(toGeometry(this));
  }

  toKeptGeometry (options = {}) {
    return toKeptGeometry$1(toGeometry(this));
  }

  getContext (symbol) {
    return this.context[symbol];
  }

  toGeometry () {
    return this.geometry;
  }

  toTransformedGeometry () {
    return toTransformedGeometry(this.toGeometry());
  }

  toPoints () {
    return toPoints(this.toKeptGeometry()).points;
  }

  transform (matrix) {
    if (matrix.some(item => typeof item !== 'number' || isNaN(item))) {
      throw Error('die');
    }
    return fromGeometry(transform(matrix, this.toGeometry()), this.context);
  }
}
const isSingleOpenPath = ({ paths }) => (paths !== undefined) && (paths.length === 1) && (paths[0][0] === null);

Shape.fromClosedPath = (path, context) => fromGeometry({ paths: [close(path)] }, context);
Shape.fromGeometry = (geometry, context) => new Shape(geometry, context);
Shape.fromOpenPath = (path, context) => fromGeometry({ paths: [open(path)] }, context);
Shape.fromPath = (path, context) => fromGeometry({ paths: [path] }, context);
Shape.fromPaths = (paths, context) => fromGeometry({ paths: paths }, context);
Shape.fromPathToSurface = (path, context) => fromGeometry(fromPathToSurface(path), context);
Shape.fromPathToZ0Surface = (path, context) => fromGeometry(fromPathToZ0Surface(path), context);
Shape.fromPathsToSurface = (paths, context) => fromGeometry(fromPathsToSurface(paths), context);
Shape.fromPathsToZ0Surface = (paths, context) => fromGeometry(fromPathsToZ0Surface(paths), context);
Shape.fromPoint = (point, context) => fromGeometry({ points: [point] }, context);
Shape.fromPoints = (points, context) => fromGeometry({ points: points }, context);
Shape.fromPolygonsToSolid = (polygons, context) => fromGeometry({ solid: fromPolygons({}, polygons) }, context);
Shape.fromPolygonsToZ0Surface = (polygons, context) => fromGeometry({ z0Surface: polygons }, context);
Shape.fromSurfaces = (surfaces, context) => fromGeometry({ solid: surfaces }, context);
Shape.fromSolid = (solid, context) => fromGeometry({ solid: solid }, context);

const fromGeometry = Shape.fromGeometry;
const toGeometry = (shape) => shape.toGeometry();
const toKeptGeometry = (shape) => shape.toKeptGeometry();

/**
 *
 * # As
 *
 * Produces a version of a shape with user defined tags.
 *
 * ::: illustration
 * ```
 * Circle(10).as('A')
 * ```
 * :::
 *
 **/

const as = (shape, tags) =>
  Shape.fromGeometry(rewriteTags(tags.map(tag => `user/${tag}`), [], shape.toGeometry()));

const notAs = (shape, tags) =>
  Shape.fromGeometry(rewriteTags([], tags.map(tag => `user/${tag}`), shape.toGeometry()));

const asMethod = function (...tags) { return as(this, tags); };
const notAsMethod = function (...tags) { return notAs(this, tags); };

Shape.prototype.as = asMethod;
Shape.prototype.notAs = notAsMethod;

asMethod.signature = 'Shape -> as(...tags:string) -> Shape';
notAsMethod.signature = 'Shape -> as(...tags:string) -> Shape';

/**
 *
 * # Union
 *
 * Union produces a version of the first shape extended to cover the remaining shapes, as applicable.
 * Different kinds of shapes do not interact. e.g., you cannot union a surface and a solid.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * union(Sphere(5).left(),
 *       Sphere(5),
 *       Sphere(5).right())
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * union(Sphere(5).left(),
 *       Sphere(5),
 *       Sphere(5).right())
 *   .section()
 *   .outline()
 * ```
 * :::
 * ::: illustration { "view": { "position": [0, 0, 5] } }
 * ```
 * union(Triangle(),
 *       Triangle().rotateZ(180))
 * ```
 * :::
 * ::: illustration { "view": { "position": [0, 0, 5] } }
 * ```
 * union(Triangle(),
 *       Triangle().rotateZ(180))
 *   .outline()
 * ```
 * :::
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * union(assemble(Cube().left(),
 *                Cube().right()),
 *       Cube().front())
 *   .section()
 *   .outline()
 * ```
 * :::
 *
 **/

// NOTE: Perhaps we should make union(a, b, c) equivalent to emptyGeometry.union(a, b, c);
// This would restore commutation.

const union = (...shapes) => {
  switch (shapes.length) {
    case 0: {
      return fromGeometry({ assembly: [] });
    }
    case 1: {
      return shapes[0];
    }
    default: {
      return fromGeometry(union$1(...shapes.map(toKeptGeometry)));
    }
  }
};

const unionMethod = function (...shapes) { return union(this, ...shapes); };
Shape.prototype.union = unionMethod;

union.signature = 'union(shape:Shape, ...shapes:Shape) -> Shape';
unionMethod.signature = 'Shape -> union(...shapes:Shape) -> Shape';

/**
 *
 * # shape.add(...shapes)
 *
 * Produces a version of shape with the regions overlapped by shapes added.
 *
 * shape.add(...shapes) is equivalent to union(shape, ...shapes).
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Cube(10).below().add(Cube(5).moveX(5).below())
 * ```
 * :::
 *
 **/

const addMethod = function (...shapes) { return union(this, ...shapes); };
Shape.prototype.add = addMethod;

addMethod.signature = 'Shape -> (...Shapes) -> Shape';

/**
 *
 * # Intersection
 *
 * Intersection produces a version of the first shape retaining only the parts included in the remaining shapes.
 *
 * Different kinds of shapes do not interact. e.g., you cannot intersect a surface and a solid.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * intersection(Cube(12),
 *              Sphere(8))
 * ```
 * :::
 * ::: illustration
 * ```
 * intersection(Circle(10).move(-5),
 *              Circle(10).move(5))
 * ```
 * :::
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * intersection(assemble(Cube().below(),
 *                       Cube().above()),
 *              Sphere(1))
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(difference(Square(10),
 *                     Square(7))
 *            .translate(-2, -2),
 *          difference(Square(10),
 *                     Square(7))
 *            .move(2, 2));
 * ```
 * :::
 * ::: illustration
 * ```
 * intersection(difference(Square(10),
 *                         Square(7))
 *                .translate(-2, -2),
 *              difference(Square(10),
 *                         Square(7))
 *                .move(2, 2));
 * ```
 * :::
 **/

const intersection = (...shapes) => {
  switch (shapes.length) {
    case 0: {
      return fromGeometry({ assembly: [] });
    }
    case 1: {
      // We still want to produce a simple shape.
      return fromGeometry(toKeptGeometry(shapes[0]));
    }
    default: {
      return fromGeometry(intersection$1(...shapes.map(toKeptGeometry)));
    }
  }
};

intersection.signature = 'intersection(shape:Shape, ...to:Shape) -> Shape';

const clipMethod = function (...shapes) { return intersection(this, ...shapes); };
Shape.prototype.clip = clipMethod;

clipMethod.signature = 'Shape -> clip(...to:Shape) -> Shape';

/**
 *
 * # Difference
 *
 * Difference produces a version of the first shape with the remaining shapes removed, where applicable.
 * Different kinds of shapes do not interact. e.g., you cannot subtract a surface from a solid.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * difference(Cube(10).below(),
 *            Cube(5).below())
 * ```
 * :::
 * ::: illustration
 * ```
 * difference(Circle(10),
 *            Circle(2.5))
 * ```
 * :::
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * difference(assemble(Cube().below(),
 *                     Cube().above()),
 *            Cube().right())
 * ```
 * :::
 *
 **/

const difference = (...shapes) => {
  switch (shapes.length) {
    case 0: {
      return fromGeometry({ assembly: [] });
    }
    case 1: {
      // We still want to produce a simple shape.
      return fromGeometry(toKeptGeometry(shapes[0]));
    }
    default: {
      return fromGeometry(difference$1(...shapes.map(toKeptGeometry)));
    }
  }
};

difference.signature = 'difference(shape:Shape, ...shapes:Shape) -> Shape';

/**
 *
 * # shape.cut(...shapes)
 *
 * Produces a version of shape with the regions overlapped by shapes removed.
 *
 * shape.cut(...shapes) is equivalent to difference(shape, ...shapes).
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Cube(10).below().cut(Cube(5).below())
 * ```
 * :::
 *
 **/

const cutMethod = function (...shapes) { return difference(this, ...shapes); };
Shape.prototype.cut = cutMethod;

cutMethod.signature = 'Shape -> cut(...shapes:Shape) -> Shape';

/**
 *
 * # Assemble
 *
 * Produces an assembly of shapes that can be manipulated as a single shape.
 * assemble(a, b) is equivalent to a.with(b).
 *
 * ::: illustration { "view": { "position": [80, 80, 80] } }
 * ```
 * assemble(Circle(20).moveZ(-12),
 *          Square(40).moveZ(16).outline(),
 *          Cylinder(10, 20));
 * ```
 * :::
 *
 * Components of the assembly can be extracted by tag filtering.
 *
 * Components later in the assembly project holes into components earlier in the
 * assembly so that the geometries are disjoint.
 *
 * ::: illustration { "view": { "position": [100, 100, 100] } }
 * ```
 * assemble(Cube(30).above().as('cube'),
 *          Cylinder(10, 40).above().as('cylinder'))
 * ```
 * :::
 * ::: illustration { "view": { "position": [100, 100, 100] } }
 * ```
 * assemble(Cube(30).above().as('cube'),
 *          Cylinder(10, 40).above().as('cylinder'))
 *   .keep('cube')
 * ```
 * :::
 * ::: illustration { "view": { "position": [100, 100, 100] } }
 * ```
 * assemble(Cube(30).above().as('cube'),
 *          assemble(Circle(40),
 *                   Circle(50).outline()).as('circles'))
 *   .keep('circles')
 * ```
 * :::
 * ::: illustration { "view": { "position": [100, 100, 100] } }
 * ```
 * assemble(Cube(30).above().as('cube'),
 *          assemble(Circle(40).as('circle'),
 *                   Circle(50).outline().as('outline')))
 *   .drop('outline')
 * ```
 * :::
 *
 **/

const assemble = (...shapes) => {
  shapes = shapes.filter(shape => shape !== undefined);
  switch (shapes.length) {
    case 0: {
      return Shape.fromGeometry({ assembly: [] });
    }
    case 1: {
      return shapes[0];
    }
    default: {
      return fromGeometry(assemble$1(...shapes.map(toGeometry)));
    }
  }
};

assemble.signature = 'assemble(...shapes:Shape) -> Shape';

const faces = (shape, op = (x => x)) => {
  const faces = [];
  for (const { solid } of getSolids(shape.toKeptGeometry())) {
    for (const surface of solid) {
      const face = Shape.fromGeometry({ surface });
      faces.push(op(face));
    }
  }
  return assemble(...faces);
};

const facesMethod = function (...args) { return faces(this, ...args); };
Shape.prototype.faces = facesMethod;

const openEdges = (shape, { isOpen = true } = {}) => {
  const paths = [];
  for (const { solid } of getSolids(shape.toKeptGeometry())) {
    paths.push(...findOpenEdges(alignVertices(solid), isOpen));
  }
  return Shape.fromGeometry({ paths });
};

const openEdgesMethod = function (...args) { return openEdges(this, ...args); };
Shape.prototype.openEdges = openEdgesMethod;

/**
 *
 * # Drop from assembly
 *
 * Generates an assembly from components in an assembly without a tag.
 *
 * If no tag is supplied, the whole shape is dropped.
 *
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .drop('A')
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .drop('B')
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .drop('A', 'B')
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Cube(10).below(),
 *          Cube(8).below().drop())
 * ```
 * :::
 *
 **/

const drop = (shape, ...tags) => {
  if (tags.length === 0) {
    return fromGeometry(rewriteTags(['compose/non-positive'], [], toGeometry(shape)));
  } else {
    return fromGeometry(drop$1(tags.map(tag => `user/${tag}`), toGeometry(shape)));
  }
};

const dropMethod = function (...tags) { return drop(this, ...tags); };
Shape.prototype.drop = dropMethod;

drop.signature = '(shape:Shape ...tags:string) -> Shape';
dropMethod.signature = 'Shape -> drop(...tags:string) -> Shape';

/**
 *
 * # shape.void(...shapes)
 *
 **/

const voidMethod = function (...shapes) { return assemble(this, ...shapes.map(drop)); };
Shape.prototype.void = voidMethod;

voidMethod.signature = 'Shape -> void(...shapes:Shape) -> Shape';

const toWireframeFromSolid = (solid) => {
  const paths = [];
  for (const surface of solid) {
    paths.push(...surface);
  }
  return Shape.fromPaths(paths);
};

const toWireframeFromSurface = (surface) => {
  return Shape.fromPaths(surface);
};

/**
 *
 * # Wireframe
 *
 * Generates a set of paths outlining a solid.
 *
 * ::: illustration { "view": { "position": [-40, -40, 40] } }
 * ```
 * Cube(10).wireframe()
 * ```
 * :::
 * ::: illustration { "view": { "position": [-40, -40, 40] } }
 * ```
 * Sphere(10).wireframe()
 * ```
 * :::
 *
 **/

const wireframe = (options = {}, shape) => {
  const pieces = [];
  for (const { solid } of getSolids(shape.toKeptGeometry())) {
    pieces.push(toWireframeFromSolid(solid));
  }
  for (const { surface } of getSurfaces(shape.toKeptGeometry())) {
    pieces.push(toWireframeFromSurface(surface));
  }
  for (const { z0Surface } of getZ0Surfaces(shape.toKeptGeometry())) {
    pieces.push(toWireframeFromSurface(z0Surface));
  }
  return assemble(...pieces);
};

const method = function (options) { return wireframe(options, this); };

Shape.prototype.wireframe = method;
Shape.prototype.withWireframe = function (options) { return assemble(this, wireframe(options, this)); };

/**
 *
 * # With
 *
 * Assembles the current shape with those provided.
 *
 * The below example is equivalent to
 * ```
 * assemble(Circle(20), Square(40).moveX(10))
 * ```
 *
 * ::: illustration { "view": { "position": [80, 80, 80] } }
 * ```
 * Circle(20).with(Square(40).moveX(10))
 * ```
 * :::
 *
 **/

const withMethod = function (...shapes) { return assemble(this, ...shapes); };
Shape.prototype.with = withMethod;

const canonicalize = (shape) => Shape.fromGeometry(canonicalize$1(shape.toGeometry()));

const canonicalizeMethod = function () { return canonicalize(this); };
Shape.prototype.canonicalize = canonicalizeMethod;

/**
 *
 * # Measure Bounding Box
 *
 * Provides the corners of the smallest orthogonal box containing the shape.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Sphere(7)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * const [corner1, corner2] = Sphere(7).measureBoundingBox();
 * Cube.fromCorners(corner1, corner2)
 * ```
 * :::
 **/

const measureBoundingBox = (shape) => measureBoundingBox$1(shape.toGeometry());

const measureBoundingBoxMethod = function () { return measureBoundingBox(this); };
Shape.prototype.measureBoundingBox = measureBoundingBoxMethod;

measureBoundingBox.signature = 'measureBoundingBox(shape:Shape) -> BoundingBox';
measureBoundingBoxMethod.signature = 'Shape -> measureBoundingBox() -> BoundingBox';

/**
 *
 * # Center
 *
 * Moves the shape so that its bounding box is centered on the origin.
 *
 * ::: illustration { "view": { "position": [60, -60, 60], "target": [0, 0, 0] } }
 * ```
 * Circle(20).with(Cube(10).center())
 * ```
 * :::
 **/

const center = (shape) => {
  const [minPoint, maxPoint] = measureBoundingBox(shape);
  let center = scale$1(0.5, add(minPoint, maxPoint));
  const moved = shape.move(...negate(center));
  return moved;
};

const centerMethod = function (...params) { return center(this); };
Shape.prototype.center = centerMethod;

center.signature = 'center(shape:Shape) -> Shape';
centerMethod.signature = 'Shape -> center() -> Shape';

/**
 *
 * # Color
 *
 * Produces a version of a shape the given color.
 * FIX: Support color in convert/threejs/toSvg.
 *
 * ::: illustration
 * ```
 * Circle(10).color('blue')
 * ```
 * :::
 * ::: illustration
 * ```
 * Triangle(10).color('chartreuse')
 * ```
 * :::
 *
 **/

const fromName = (shape, name) =>
  Shape.fromGeometry(rewriteTags([toTagFromName(name)], [], shape.toGeometry()));

const color = (...args) => fromName(...args);

const colorMethod = function (...args) { return color(this, ...args); };
Shape.prototype.color = colorMethod;

color.signature = 'color(shape:Shape, color:string) -> Shape';
colorMethod.signature = 'Shape -> color(color:string) -> Shape';

const colors = (shape) =>
  [...allTags(shape.toGeometry())]
      .filter(tag => tag.startsWith('color/'))
      .map(tag => tag.substring(6));

const colorsMethod = function () { return colors(this); };
Shape.prototype.colors = colorsMethod;

colors.signature = 'colors(shape:Shape) -> strings';
colorsMethod.signature = 'Shape -> colors() -> strings';

/**
 *
 * # Keep in assembly
 *
 * Generates an assembly from components in an assembly with a tag.
 *
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .keep('A')
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .keep('B')
 * ```
 * :::
 * ::: illustration
 * ```
 * assemble(Circle(10).as('A'),
 *          Square(10).as('B'))
 *   .keep('A', 'B')
 * ```
 * :::
 *
 **/

const keep = (shape, tags) => fromGeometry(keep$1(tags.map(tag => `user/${tag}`), toGeometry(shape)));

const keepMethod = function (...tags) { return keep(this, tags); };
Shape.prototype.keep = keepMethod;

keep.signature = 'keep(shape:Shape, tags:strings) -> Shape';
keepMethod.signature = 'Shape -> keep(tags:strings) -> Shape';

/**
 *
 * # Kept
 *
 * Kept produces a geometry without dropped elements.
 *
 **/

const kept = (shape) => Shape.fromGeometry(toKeptGeometry(shape));

const keptMethod = function () { return kept(this); };
Shape.prototype.kept = keptMethod;

kept.signature = 'kept(shape:Shape) -> Shape';
keptMethod.signature = 'Shape -> kept() -> Shape';

/**
 *
 * # Log
 *
 * Writes a string to the console.
 *
 * ```
 * log("Hello, World")
 * ```
 *
 **/

const log = (text) => log$1({ op: 'text', text: String(text) });

const logMethod = function () { log(JSON.stringify(this.toKeptGeometry())); return this; };
Shape.prototype.log = logMethod;

log.signature = 'log(text:string)';

/**
 *
 * # Material
 *
 * Produces a version of a shape with a given material.
 *
 * Materials supported include 'paper', 'metal', 'glass', etc.
 *
 * ::: illustration
 * ```
 * Cylinder(5, 10).material('copper')
 * ```
 * :::
 *
 **/

const material = (shape, ...tags) =>
  Shape.fromGeometry(rewriteTags(tags.map(tag => `material/${tag}`), [], shape.toGeometry()));

const materialMethod = function (...tags) { return material(this, ...tags); };
Shape.prototype.material = materialMethod;

material.signature = 'material(shape:Shape) -> Shape';
materialMethod.signature = 'Shape -> material() -> Shape';

/**
 *
 * # Translate
 *
 * Translation moves a shape.
 *
 * ::: illustration { "view": { "position": [10, 0, 10] } }
 * ```
 * assemble(Circle(),
 *          Sphere().above())
 * ```
 * :::
 * ::: illustration { "view": { "position": [10, 0, 10] } }
 * ```
 * assemble(Circle(),
 *          Sphere().above()
 *                  .translate(0, 0, 1))
 * ```
 * :::
 * ::: illustration { "view": { "position": [10, 0, 10] } }
 * ```
 * assemble(Circle(),
 *          Sphere().above()
 *                  .translate(0, 1, 0))
 * ```
 * :::
 * ::: illustration { "view": { "position": [10, 0, 10] } }
 * ```
 * assemble(Circle(),
 *          Sphere().above()
 *                  .translate([-1, -1, 1]))
 * ```
 * :::
 *
 **/

const translate = (shape, x = 0, y = 0, z = 0) => shape.transform(fromTranslation([x, y, z]));

const method$1 = function (...args) { return translate(this, ...args); };
Shape.prototype.translate = method$1;

/**
 *
 * # Move
 *
 * A shorter way to write translate.
 *
 */

const move = (...args) => translate(...args);

const moveMethod = function (...params) { return translate(this, ...params); };
Shape.prototype.move = moveMethod;

move.signature = 'move(shape:Shape, x:number = 0, y:number = 0, z:number = 0) -> Shape';
moveMethod.signature = 'Shape -> move(x:number = 0, y:number = 0, z:number = 0) -> Shape';

/**
 *
 * # MoveX
 *
 * Move along the X axis.
 *
 */

const moveX = (shape, x = 0) => move(shape, x);

const moveXMethod = function (x) { return moveX(this, x); };
Shape.prototype.moveX = moveXMethod;

moveX.signature = 'moveX(shape:Shape, x:number = 0) -> Shape';
moveXMethod.signature = 'Shape -> moveX(x:number = 0) -> Shape';

/**
 *
 * # MoveY
 *
 * Move along the Y axis.
 *
 */

const moveY = (shape, y = 0) => move(shape, 0, y);

const moveYMethod = function (y) { return moveY(this, y); };
Shape.prototype.moveY = moveYMethod;

moveY.signature = 'moveY(shape:Shape, y:number = 0) -> Shape';
moveYMethod.signature = 'Shape -> moveY(y:number = 0) -> Shape';

/**
 *
 * # MoveZ
 *
 * Move along the Z axis.
 *
 */

const moveZ = (shape, z = 0) => move(shape, 0, 0, z);

const moveZMethod = function (z) { return moveZ(this, z); };
Shape.prototype.moveZ = moveZMethod;

moveZ.signature = 'moveZ(shape:Shape, z:number = 0) -> Shape';
moveZMethod.signature = 'Shape -> moveZ(z:number = 0) -> Shape';

/**
 *
 * # Mark an object as not to cut holes.
 *
 **/

const nocut = (shape, ...tags) => fromGeometry(nonNegative(tags.map(tag => `user/${tag}`), toGeometry(shape)));

const nocutMethod = function (...tags) { return nocut(this, tags); };
Shape.prototype.nocut = nocutMethod;

nocut.signature = 'nocut(shape:Shape, ...tag:string) -> Shape';
nocutMethod.signature = 'Shape -> nocut(...tag:string) -> Shape';

/**
 *
 * # Orient
 *
 * Orients a shape so that it moves from 'center' to 'from' and faces toward 'at', rather than 'facing'.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).orient({ from: [3, 3, 3], at: [1, 1, 1] });
 * ```
 * :::
 **/

const orient = (shape, { center = [0, 0, 0], facing = [0, 0, 1], at = [0, 0, 0], from = [0, 0, 0] }) => {
  const normalizedFacing = normalize(facing);
  const normalizedAt = normalize(subtract(at, from));

  const angle = Math.acos(dot(normalizedFacing, normalizedAt)) * 180 / Math.PI;
  const axis = normalize(cross(normalizedFacing, normalizedAt));

  return shape
      .move(negate(center))
      .rotate(angle, axis)
      .move(from);
};

const orientMethod = function (...args) { return orient(this, ...args); };
Shape.prototype.orient = orientMethod;

orient.signature = 'orient(Shape:shape, { center:Point, facing:Vector, at:Point, from:Point }) -> Shape';
orientMethod.signature = 'Shape -> orient({ center:Point, facing:Vector, at:Point, from:Point }) -> Shape';

/**
 *
 * # Write Shape Geometry
 *
 * This writes a shape as a tagged geometry in json format.
 *
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * await Cube().writeShape('cube.shape');
 * await readShape({ path: 'cube.shape' })
 * ```
 * :::
 *
 **/

const cacheShape = async (options, shape) => {
  const { path } = options;
  const geometry = shape.toGeometry();
  await writeFile({}, `cache/${path}`, JSON.stringify(geometry));
};

const writeShape = async (options, shape) => {
  if (typeof options === 'string') {
    options = { path: options };
  }
  const { path } = options;
  const geometry = shape.toGeometry();
  await writeFile({}, `output/${path}`, JSON.stringify(geometry));
  await writeFile({}, `geometry/${path}`, JSON.stringify(geometry));
};

const writeShapeMethod = function (options = {}) { return writeShape(options, this); };
Shape.prototype.writeShape = writeShapeMethod;

/**
 *
 * # Read Shape Geometry
 *
 * This reads tagged geometry in json format and produces a shape.
 *
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * await Cube().writeShape({ path: 'geometry/cube' })
 * await readShape({ path: 'geometry/cube' })
 * ```
 * :::
 *
 * A shape building function can be supplied to generate the shape to read if absent.
 *
 * The second read will not call the build function, and it will be present in re-runs.
 *
 * This allows the caching of complex geometry for fast recomposition.
 *
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * await readShape({ path: 'geometry/sphere' }, () => Sphere())
 * await readShape({ path: 'geometry/sphere' }, () => Sphere())
 * ```
 * :::
 *
 **/

const readShape = async (options, build) => {
  if (typeof options === 'string') {
    options = { path: options };
  }
  const { ephemeral, path } = options;

  let data = await readFile({ as: 'utf8', ...options }, `source/${path}`);
  if (data === undefined) {
    data = await readFile({ as: 'utf8', sources: getSources(`cache/${path}`), ...options }, `cache/${path}`);
  }

  if (data === undefined && build !== undefined) {
    const shape = await build();
    if (!ephemeral) {
      await cacheShape(options, shape);
    }
    return shape;
  }
  const geometry = JSON.parse(data);
  return Shape.fromGeometry(geometry);
};

/**
 *
 * # Rotate
 *
 * ```
 * rotate(shape, axis, angle)
 * shape.rotate(axis, angle)
 * ```
 *
 * Rotates the shape around the provided axis.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).rotate([1, 1, 1], 90)
 * ```
 * :::
 **/

const rotate = (shape, axis, angle) => shape.transform(fromRotation(angle * 0.017453292519943295, axis));

const rotateMethod = function (angle, axis) { return rotate(this, axis, angle); };
Shape.prototype.rotate = rotateMethod;

/**
 *
 * # Rotate X
 *
 * Rotates the shape around the X axis.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).rotateX(90)
 * ```
 * :::
 **/

const rotateX = (shape, angle) => shape.transform(fromXRotation(angle * 0.017453292519943295));

const rotateXMethod = function (angle) { return rotateX(this, angle); };
Shape.prototype.rotateX = rotateXMethod;

/**
 *
 * # Rotate Y
 *
 * Rotates the shape around the Y axis.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).rotateY(90)
 * ```
 * :::
 **/

const rotateY = (shape, angle) => shape.transform(fromYRotation(angle * 0.017453292519943295));

const rotateYMethod = function (angle) { return rotateY(this, angle); };
Shape.prototype.rotateY = rotateYMethod;

/**
 *
 * # Rotate Z
 *
 * Rotates the shape around the Z axis.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).rotateZ(45)
 * ```
 * :::
 **/

const rotateZ = (shape, angle) => shape.transform(fromZRotation(angle * 0.017453292519943295));

const rotateZMethod = function (angle) { return rotateZ(this, angle); };
Shape.prototype.rotateZ = rotateZMethod;

/**
 *
 * # Scale
 *
 * Scales an object uniformly or per axis.
 *
 * ::: illustration { "view": { "position": [10, 10, 10] } }
 * ```
 * Cube()
 * ```
 * :::
 * ::: illustration { "view": { "position": [10, 10, 10] } }
 * ```
 * Cube().scale(2)
 * ```
 * :::
 * ::: illustration { "view": { "position": [10, 10, 10] } }
 * ```
 * Cube().scale([1, 2, 3])
 * ```
 * :::
 **/

const scale = (factor, shape) => {
  if (factor.length) {
    const [x = 1, y = 1, z = 1] = factor;
    return shape.transform(fromScaling([x, y, z]));
  } else {
    return shape.transform(fromScaling([factor, factor, factor]));
  }
};

const scaleMethod = function (factor) { return scale(factor, this); };
Shape.prototype.scale = scaleMethod;

const X = 0;
const Y = 1;
const Z = 2;

const size = (shape) => {
  const [min, max] = measureBoundingBox(shape);
  const length = max[X] - min[X];
  const width = max[Y] - min[Y];
  const height = max[Z] - min[Z];
  const center = scale$1(0.5, add(min, max));
  const radius = distance(center, max);
  return { length, width, height, max, min, center, radius };
};

const sizeMethod = function () { return size(this); };
Shape.prototype.size = sizeMethod;

size.signature = 'size(shape:Shape) -> Size';
sizeMethod.signature = 'Shape -> size() -> Size';

/**
 *
 * # Turn
 *
 * ```
 * turn(shape, axis, angle)
 * shape.turn(axis, angle)
 * ```
 *
 * Rotates the shape around its own axis.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10)
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * Square(10).turn([1, 1, 1], 90)
 * ```
 * :::
 **/

const turn = (shape, axis, angle) => {
  const center = shape.measureCenter();
  return shape.move(...negate(center))
      .rotate(axis, angle)
      .move(...center);
};

const turnMethod = function (angle, axis) { return turn(this, axis, angle); };
Shape.prototype.turn = turnMethod;

const turnX = (shape, angle) => {
  const center = shape.measureCenter();
  return shape.move(...negate(center))
      .rotateX(angle)
      .move(...center);
};

const turnXMethod = function (angle) { return turnX(this, angle); };
Shape.prototype.turnX = turnXMethod;

const turnY = (shape, angle) => {
  const center = shape.measureCenter();
  return shape.move(...negate(center))
      .rotateY(angle)
      .move(...center);
};

const turnYMethod = function (angle) { return turnY(this, angle); };
Shape.prototype.turnY = turnYMethod;

const turnZ = (shape, angle) => {
  const center = shape.measureCenter();
  return shape.move(...negate(center))
      .rotateZ(angle)
      .move(...center);
};

const turnZMethod = function (angle) { return turnZ(this, angle); };
Shape.prototype.turnZ = turnZMethod;

export default Shape;
export { Shape, assemble, canonicalize, center, color, colors, difference, drop, intersection, keep, kept, log, material, move, moveX, moveY, moveZ, nocut, orient, readShape, rotate, rotateX, rotateY, rotateZ, scale, size, translate, turn, turnX, turnY, turnZ, union, writeShape };
