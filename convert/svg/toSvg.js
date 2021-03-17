import {
  canonicalize,
  measureBoundingBox,
  scale,
  toPolygonsWithHoles,
  toTransformedGeometry,
  translate,
} from '@jsxcad/geometry-tagged';

import { toRgbColorFromTags } from '@jsxcad/algorithm-color';

const X = 0;
const Y = 1;

export const toSvg = async (
  baseGeometry,
  { padding = 0, definitions } = {}
) => {
  const flippedGeometry = scale([1, -1, 1], await baseGeometry);
  const [min, max] = measureBoundingBox(flippedGeometry);
  const width = max[X] - min[X];
  const height = max[Y] - min[Y];
  const translated = translate([width / 2, height / 2, 0], flippedGeometry);
  const geometry = canonicalize(toTransformedGeometry(translated));

  const svg = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- Generated by jsxcad -->`,
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">`,
    `<svg baseProfile="tiny" height="${height}mm" width="${width}mm" viewBox="${-padding} ${-padding} ${
      width + 2 * padding
    } ${
      height + 2 * padding
    }" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">`,
  ];

  for (const { tags, polygonsWithHoles } of toPolygonsWithHoles(geometry)) {
    for (const polygonWithHoles of polygonsWithHoles) {
      const { points, holes } = polygonWithHoles;
      const color = toRgbColorFromTags(tags, definitions);
      const d = [];
      d.push(
        points
          .map(
            (point, index) =>
              `${index === 0 ? 'M' : 'L'}${point[0]} ${point[1]}`
          )
          .join(' ')
      );
      for (const { points } of holes) {
        d.push(
          points
            .map(
              (point, index) =>
                `${index === 0 ? 'M' : 'L'}${point[0]} ${point[1]}`
            )
            .join(' ')
        );
      }
      if (tags && tags.includes('path/Wire')) {
        svg.push(`<path fill="none" stroke="${color}" d="${d.join(' ')} z"/>`);
      } else {
        svg.push(
          `<path fill="${color}" stroke="${color}" d="${d.join(' ')} z"/>`
        );
      }
    }
  }

  /*
  for (const { tags, paths } of outline(geometry)) {
    const color = toRgbColorFromTags(tags, definitions);
    for (const path of paths) {
      if (isClosed(path)) {
        const d = path.map(
          (point, index) => `${index === 0 ? 'M' : 'L'}${point[0]} ${point[1]}`
        );
        if (tags && tags.includes('path/Wire')) {
          svg.push(
            `<path fill="none" stroke="${color}" d="${d.join(' ')} z"/>`
          );
        } else {
          svg.push(
            `<path fill="${color}" stroke="${color}" d="${d.join(' ')} z"/>`
          );
        }
      } else {
        const d = path
          .slice(1)
          .map(
            (point, index) =>
              `${index === 0 ? 'M' : 'L'}${point[0]} ${point[1]}`
          );
        svg.push(`<path fill="none" stroke="${color}" d="${d.join(' ')}"/>`);
      }
    }
  }
*/
  svg.push('</svg>');
  const output = svg.join('\n');
  return new TextEncoder('utf8').encode(output);
};
