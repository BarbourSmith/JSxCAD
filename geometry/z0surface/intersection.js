import { clippingToPolygons, notEmpty, z0SurfaceToClipping } from './clippingToPolygons';
import polygonClipping from 'polygon-clipping';

/**
 * Produce a surface that is the intersection of all provided surfaces.
 * The intersection of no surfaces is the empty surface.
 * The intersection of one surface is that surface.
 * @param {Array<surface>} surfaces - the surfaces to intersect.
 * @returns {surface} the intersection of surfaces.
 * @example
 * let C = difference(A, B)
 * @example
 * +-------+            +-------+
 * |       |            |   C   |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
export const intersection = (...z0Surfaces) => {
  if (z0Surfaces.length === 0) {
    return [];
  }
  const clipping = z0Surfaces.filter(notEmpty).map(surface => z0SurfaceToClipping(surface));
  if (notEmpty(clipping)) {
    return clippingToPolygons(polygonClipping.intersection(...z0Surfaces.map(z0SurfaceToClipping)));
  } else {
    return [];
  }
};
