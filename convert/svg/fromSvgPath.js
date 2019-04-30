import absolutifySvgPath from 'abs-svg-path';
import { buildAdaptiveCubicBezierCurve } from '@jsxcad/algorithm-shape';
import { canonicalize } from '@jsxcad/algorithm-path';
import curvifySvgPath from 'curvify-svg-path';
import { equals } from '@jsxcad/math-vec2';
import { fromScaling } from '@jsxcad/math-mat4';
import parseSvgPath from 'parse-svg-path';
import { transform } from '@jsxcad/algorithm-paths';

// FIX: Check scaling.

const removeRepeatedPoints = (path) => {
  const unrepeated = [path[0]];
  for (let nth = 1; nth < path.length; nth++) {
    const last = path[nth - 1];
    const current = path[nth];
    if (last === null || !equals(last, current)) {
      unrepeated.push(current);
    }
  }
  return unrepeated;
};

const toPaths = ({ curveSegments, normalizeCoordinateSystem = true }, svgPath) => {
  const paths = [];
  let path = [null];

  const newPath = () => {
    if (path[0] === null) {
      maybeClosePath();
    }
    if (path.length < 2) {
      // An empty path.
      return;
    }
    paths.push(path);
    path = [null];
  };

  const maybeClosePath = () => {
    path = removeRepeatedPoints(canonicalize(path));
    if (path.length > 3) {
      if (path[0] === null && equals(path[1], path[path.length - 1])) {
        // The path is closed, remove the leading null, and the duplicate point at the end.
        path = path.slice(1, path.length - 1);
        newPath();
      }
    }
  };

  for (const segment of svgPath) {
    const [directive, ...args] = segment;
    switch (directive) {
      case 'M': {
        maybeClosePath();
        newPath();
        const [x, y] = args;
        path.push([x, y]);
        break;
      }
      case 'C': {
        const [x1, y1, x2, y2, x, y] = args;
        const start = path[path.length - 1];
        const [xStart, yStart] = (start === null) ? [0, 0] : start;
        path = path.concat(buildAdaptiveCubicBezierCurve({ segments: curveSegments }, [[xStart, yStart], [x1, y1], [x2, y2], [x, y]]));
        break;
      }
      default: {
        throw Error(`Unexpected segment: ${JSON.stringify(segment)}`);
      }
    }
  }

  maybeClosePath();
  newPath();

  if (normalizeCoordinateSystem) {
    // Turn it upside down.
    return transform(fromScaling([1, -1, 0]), paths);
  } else {
    return paths;
  }
};

export const fromSvgPath = (options = {}, svgPath) =>
  ({ paths: toPaths(options, curvifySvgPath(absolutifySvgPath(parseSvgPath(svgPath)))) });