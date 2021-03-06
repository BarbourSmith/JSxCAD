import Shape from './Shape.js';

export const ofPointPaths = (points = [], paths = []) => {
  const polygons = [];
  for (const path of paths) {
    polygons.push({ points: path.map((point) => points[point]) });
  }
  return Shape.fromPolygons(polygons);
};

export const Polyhedron = (...args) => ofPointPaths(...args);

Polyhedron.ofPointPaths = ofPointPaths;

export default Polyhedron;

Shape.prototype.Polyhedron = Shape.shapeMethod(Polyhedron);
