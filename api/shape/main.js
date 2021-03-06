/**
 *
 * Defines the interface used by the api to access the rest of the system on
 * behalf of a user. e.g., algorithms and geometries.
 *
 * A user can destructively update this mapping in their code to change what
 * the api uses.
 */

import { Peg } from './Peg.js';

export {
  define,
  defGrblConstantLaser,
  defGrblDynamicLaser,
  defGrblPlotter,
  defGrblSpindle,
  defRgbColor,
  defThreejsMaterial,
  defTool,
} from './define.js';

export const yz = Peg('x', [0, 0, 0], [0, 0, 1], [0, -1, 0]);
export const xz = Peg('y', [0, 0, 0], [0, 0, 1], [1, 0, 0]);
export const xy = Peg('z', [0, 0, 0], [0, 1, 0], [-1, 0, 0]);

export { md } from './md.js';

export { elapsed, emit, info, read, write } from '@jsxcad/sys';

export { Shape } from './Shape.js';
export { add } from './add.js';
export { and } from './and.js';
export { addTo } from './addTo.js';
export { align } from './align.js';
export { as } from './as.js';
export { bend } from './bend.js';
export { clip } from './clip.js';
export { clipFrom } from './clipFrom.js';
export { color } from './color.js';
export { colors } from './colors.js';
export { cloudSolid } from './cloudSolid.js';
export { cut } from './cut.js';
export { cutFrom } from './cutFrom.js';
export { drop } from './drop.js';
export { ensurePages } from './Page.js';
export { each } from './each.js';
export { ex, extrude } from './extrude.js';
export { extrudeToPlane } from './extrudeToPlane.js';
export { fill, withFill } from './fill.js';
export { fuse } from './fuse.js';
export { grow } from './grow.js';
export { inline } from './inline.js';
export { inset } from './inset.js';
export { keep } from './keep.js';
export { loadGeometry } from './loadGeometry.js';
export { loft } from './loft.js';
export { log } from './log.js';
export { loop } from './loop.js';
export { material } from './material.js';
export { minkowskiDifference } from './minkowskiDifference.js';
export { minkowskiShell } from './minkowskiShell.js';
export { minkowskiSum } from './minkowskiSum.js';
export { move } from './move.js';
export { noVoid } from './noVoid.js';
export { notAs } from './notAs.js';
export { offset } from './offset.js';
export { op } from './op.js';
export { outline } from './outline.js';
export { orient } from './orient.js';
export { pack } from './pack.js';
export { projectToPlane } from './projectToPlane.js';
export { push } from './push.js';
export { remesh } from './remesh.js';
export { rotate } from './rotate.js';
export { rotateX, rx } from './rx.js';
export { rotateY, ry } from './ry.js';
export { rotateZ, rz } from './rz.js';
export { saveGeometry } from './saveGeometry.js';
export { section, sectionProfile } from './section.js';
export { separate } from './separate.js';
export { scale } from './scale.js';
export { smooth } from './smooth.js';
export { size } from './size.js';
export { sketch } from './sketch.js';
export { tags } from './tags.js';
export { test } from './test.js';
export { tint } from './tint.js';
export { tool } from './tool.js';
export { twist } from './twist.js';
export { view } from './view.js';
export { voidFn } from './void.js';
export { weld } from './Weld.js';
export { withFn } from './with.js';
export { withInset } from './inset.js';
export { withOp } from './op.js';
export { x } from './x.js';
export { y } from './y.js';
export { z } from './z.js';

export { Alpha } from './Alpha.js';
export { Arc } from './Arc.js';
export { Assembly } from './Assembly.js';
export { Box } from './Box.js';
export { ChainedHull } from './ChainedHull.js';
export { Cone } from './Cone.js';
export { Empty } from './Empty.js';
export { Group } from './Group.js';
export { Hershey } from './Hershey.js';
export { Hexagon } from './Hexagon.js';
export { Hull } from './Hull.js';
export { Icosahedron } from './Icosahedron.js';
export { Item } from './Item.js';
export { Implicit } from './Implicit.js';
export { Line } from './Line.js';
export { Octagon } from './Octagon.js';
export { Orb } from './Orb.js';
export { Page } from './Page.js';
export { Path } from './Path.js';
export { Peg } from './Peg.js';
export { Pentagon } from './Pentagon.js';
export { Plan } from './Plan.js';
export { Point } from './Point.js';
export { Points } from './Points.js';
export { Polygon } from './Polygon.js';
export { Polyhedron } from './Polyhedron.js';
export { Septagon } from './Septagon.js';
export { Spiral } from './Spiral.js';
export { Tetragon } from './Tetragon.js';
export { Triangle } from './Triangle.js';
export { Wave } from './Wave.js';
export { Weld } from './Weld.js';
export { ofPlan } from './Plan.js';

export { foot, inch, mm, mil, cm, m, thou, yard } from '@jsxcad/api-v1-units';
