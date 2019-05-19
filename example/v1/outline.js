import { assemble, cube, cylinder, sphere, writePdf } from '@jsxcad/api-v1';

export const main = async () => {
  const scene = assemble(sphere(10).as('sphere'),
                         cube(10).front().right().above().as('cube'),
                         cylinder({ r: 3, h: 27 }).as('cylinder'));
  await writePdf({ path: 'tmp/outline.sphere.pdf' }, scene.withComponents({ requires: ['sphere'] }).crossSection().outline());
  await writePdf({ path: 'tmp/outline.spherecube.pdf' }, scene.withComponents({ requires: ['sphere', 'cube'] }).crossSection().outline());
};
