import { readJscad, writeStl } from '@jsxcad/api-v1';

export const main = async () => {
  const example001 = await readJscad(
    {
      script: `
               // title      : Example 001
               // author     : OpenSCAD.org, adapted by Rene K. Mueller
               // license    : MIT License
               // description: example001.scad ported to OpenJSCAD.org
               // file       : example001.jscad
               
               function radiusFromDiameter (d) {
                return d / 2;
               }
              
               function rotcy (rot, r, h) {
                 return rotate(rot, cylinder({r: r, h: h, center: true}));
               }
                              
               function example001 () {
                 var size = 50;
                 var hole = 25;
                 var radius = radiusFromDiameter(hole);
                 var height = radiusFromDiameter(size * 2.5);
               
               return difference(
                 sphere({r: radiusFromDiameter(size)}),
                 rotcy([0, 0, 0], radius, height),
                 rotcy([90, 0, 0], radius, height),
                 rotcy([0, 90, 0], radius, height)
                 );
               }
                              
               function main () {
                 return example001();
               }
               `
    });

  writeStl({ path: 'tmp/jscad.stl' }, example001());
}
