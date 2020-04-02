import { Shape } from './Shape';
import { rewrite } from '@jsxcad/geometry-tagged';

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

const selectToKeep = (matchTags, geometryTags) => {
  if (geometryTags === undefined) {
    return false;
  }
  for (const geometryTag of geometryTags) {
    if (matchTags.includes(geometryTag)) {
      return true;
    }
  }
  return false;
};

const selectToDrop = (matchTags, geometryTags) => !selectToKeep(matchTags, geometryTags);

const keepOrDrop = (shape, tags, select) => {
  const matchTags = tags.map(tag => `user/${tag}`);

  const rewritten = rewrite(shape.toKeptGeometry(),
                            (geometry, descend) => {
                              if (geometry.solid || geometry.surface || geometry.z0Surface || geometry.points || geometry.paths) {
                                if (select(matchTags, geometry.tags)) {
                                  return descend();
                                } else {
                                  // Operate on the solid.
                                  const shape = Shape.fromGeometry(geometry);
                                  // FIX:
                                  // If this is in a disjointAssembly we should drop it.
                                  // If it is in an assembly or layers we should not.
                                  const dropped = shape.Void().with(shape.sketch()).toGeometry();
                                  return dropped;
                                }
                              } else if (geometry.disjointAssembly) {
                                // Turn them all back into assemblies to work around the above issue.
                                return { assembly: geometry.disjointAssembly, tags: geometry.tags };
                              } else {
                                return descend();
                              }
                            });
  return Shape.fromGeometry(rewritten);
};

export const keep = (shape, tags) => keepOrDrop(shape, tags, selectToKeep);
export const drop = (shape, tags) => keepOrDrop(shape, tags, selectToDrop);

const keepMethod = function (...tags) { return keep(this, tags); };
Shape.prototype.keep = keepMethod;

const dropMethod = function (...tags) { return drop(this, tags); };
Shape.prototype.drop = dropMethod;
