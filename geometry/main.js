import {
  fromScaling,
  fromTranslation,
  fromXRotation,
  fromYRotation,
  fromZRotation,
} from '@jsxcad/math-mat4';

import { transform } from './tagged/transform.js';

export const rotateX = (angle, geometry) =>
  transform(fromXRotation((angle * Math.PI) / 180), geometry);
export const rotateY = (angle, geometry) =>
  transform(fromYRotation((angle * Math.PI) / 180), geometry);
export const rotateZ = (angle, geometry) =>
  transform(fromZRotation((angle * Math.PI) / 180), geometry);
export const translate = (vector, geometry) =>
  transform(fromTranslation(vector), geometry);
export const scale = (vector, geometry) =>
  transform(fromScaling(vector), geometry);

export { isNotVoid, isVoid } from './tagged/isNotVoid.js';

export { rewrite, visit } from './tagged/visit.js';

export { allTags } from './tagged/allTags.js';
export { alphaShape } from './graph/alphaShape.js';
export { arrangePolygonsWithHoles } from './graph/arrangePolygonsWithHoles.js';
export { assemble } from './tagged/assemble.js';
export { bend } from './tagged/bend.js';
export { close as closePath } from './path/close.js';
export { concatenate as concatenatePath } from './path/concatenate.js';
export { canonicalize } from './tagged/canonicalize.js';
export { canonicalize as canonicalizePath } from './path/canonicalize.js';
export { canonicalize as canonicalizePaths } from './paths/canonicalize.js';
export { convexHull as convexHullToGraph } from './graph/convexHull.js';
export { deduplicate as deduplicatePath } from './path/deduplicate.js';
export { difference } from './tagged/difference.js';
export { disjoint } from './tagged/disjoint.js';
export { doesNotOverlap } from './tagged/doesNotOverlap.js';
export { drop } from './tagged/drop.js';
export { eachItem } from './tagged/eachItem.js';
export { eachPoint } from './tagged/eachPoint.js';
export { empty } from './tagged/empty.js';
export { extrude } from './tagged/extrude.js';
export { extrudeToPlane } from './tagged/extrudeToPlane.js';
export { flip } from './tagged/flip.js';
export { flip as flipPath } from './path/flip.js';
export { fresh } from './tagged/fresh.js';
export { fromFunction as fromFunctionToGraph } from './graph/fromFunction.js';
export { fromPaths as fromPathsToGraph } from './graph/fromPaths.js';
export { fromPoints as fromPointsToGraph } from './graph/fromPoints.js';
export { fromPolygons as fromPolygonsToGraph } from './graph/fromPolygons.js';
export { fromPolygonsWithHolesToTriangles } from './graph/fromPolygonsWithHolesToTriangles.js';
export { fromSurfaceToPaths } from './tagged/fromSurfaceToPaths.js';
export { fromTriangles as fromTrianglesToGraph } from './graph/fromTriangles.js';
export { getAnyNonVoidSurfaces } from './tagged/getAnyNonVoidSurfaces.js';
export { getAnySurfaces } from './tagged/getAnySurfaces.js';
export { getItems } from './tagged/getItems.js';
export { getLayouts } from './tagged/getLayouts.js';
export { getLeafs } from './tagged/getLeafs.js';
export { getNonVoidGraphs } from './tagged/getNonVoidGraphs.js';
export { getNonVoidItems } from './tagged/getNonVoidItems.js';
export { getNonVoidPaths } from './tagged/getNonVoidPaths.js';
export { getNonVoidFaceablePaths } from './tagged/getNonVoidFaceablePaths.js';
export { getNonVoidPlans } from './tagged/getNonVoidPlans.js';
export { getNonVoidPoints } from './tagged/getNonVoidPoints.js';
export { getFaceablePaths } from './tagged/getFaceablePaths.js';
export { getGraphs } from './tagged/getGraphs.js';
export { getPaths } from './tagged/getPaths.js';
export { getEdges as getPathEdges } from './path/getEdges.js';
export { getPeg } from './tagged/getPeg.js';
export { getPlans } from './tagged/getPlans.js';
export { getPoints } from './tagged/getPoints.js';
export { getTags } from './tagged/getTags.js';
export { grow } from './tagged/grow.js';
export { hash } from './tagged/hash.js';
export { fill } from './tagged/fill.js';
export { intersection } from './tagged/intersection.js';
export { inset } from './tagged/inset.js';
export { isClockwise as isClockwisePath } from './path/isClockwise.js';
export { isClosed as isClosedPath } from './path/isClosed.js';
export { keep } from './tagged/keep.js';
export { loft } from './tagged/loft.js';
export { measureBoundingBox } from './tagged/measureBoundingBox.js';
export { minkowskiDifference } from './tagged/minkowskiDifference.js';
export { minkowskiShell } from './tagged/minkowskiShell.js';
export { minkowskiSum } from './tagged/minkowskiSum.js';
export { offset } from './tagged/offset.js';
export { open as openPath } from './path/open.js';
export { outline } from './tagged/outline.js';
export { projectToPlane } from './tagged/projectToPlane.js';
export { prepareForSerialization } from './tagged/prepareForSerialization.js';
export { push } from './tagged/push.js';
export { read } from './tagged/read.js';
export { realize } from './tagged/realize.js';
export { realizeGraph } from './graph/realizeGraph.js';
export { registerReifier, reify } from './tagged/reify.js';
export { remesh } from './tagged/remesh.js';
export { rewriteTags } from './tagged/rewriteTags.js';
export { rerealizeGraph } from './graph/rerealizeGraph.js';
export { reverseFaceOrientations as reverseFaceOrientationsOfGraph } from './graph/reverseFaceOrientations.js';
export { rotateZ as rotateZPath } from './path/ops.js';
export { scale as scalePath } from './path/ops.js';
export { scale as scalePaths } from './paths/ops.js';
export { section } from './tagged/section.js';
export { smooth } from './tagged/smooth.js';
export { separate } from './tagged/separate.js';
export { soup } from './tagged/soup.js';
export { taggedItem } from './tagged/taggedItem.js';
export { taggedDisplayGeometry } from './tagged/taggedDisplayGeometry.js';
export { taggedGraph } from './tagged/taggedGraph.js';
export { taggedGroup } from './tagged/taggedGroup.js';
export { taggedLayout } from './tagged/taggedLayout.js';
export { taggedPaths } from './tagged/taggedPaths.js';
export { taggedPlan } from './tagged/taggedPlan.js';
export { taggedPoints } from './tagged/taggedPoints.js';
export { taggedSketch } from './tagged/taggedSketch.js';
export { taggedTriangles } from './tagged/taggedTriangles.js';
export { test } from './tagged/test.js';
export { translate as translatePath } from './path/ops.js';
export { translate as translatePaths } from './paths/ops.js';
export { toConcreteGeometry } from './tagged/toConcreteGeometry.js';
export {
  toDisjointGeometry,
  toVisiblyDisjointGeometry,
} from './tagged/toDisjointGeometry.js';
export { toDisplayGeometry } from './tagged/toDisplayGeometry.js';
export { toKeptGeometry } from './tagged/toKeptGeometry.js';
export { toTransformedGeometry } from './tagged/toTransformedGeometry.js';
export { toPoints } from './tagged/toPoints.js';
export { toPolygonsWithHoles } from './tagged/toPolygonsWithHoles.js';
export { toTriangles as toTrianglesFromGraph } from './graph/toTriangles.js';
export { transform } from './tagged/transform.js';
export { transform as transformPaths } from './paths/transform.js';
export { twist } from './tagged/twist.js';
export { union } from './tagged/union.js';
export { update } from './tagged/update.js';
export { write } from './tagged/write.js';
