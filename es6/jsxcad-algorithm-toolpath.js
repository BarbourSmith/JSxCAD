import { normalize, subtract, rotateZ, scale, add } from './jsxcad-math-vec3.js';
import { getEdges, createOpenPath } from './jsxcad-geometry-path.js';
import { fromPoints, intersect } from './jsxcad-math-line2.js';
import { getNonVoidPaths } from './jsxcad-geometry-tagged.js';

const toolpathEdges = (path, radius = 1, overcut = 0, solid = false) => {
  const toolpaths = [];
  let toolpath;
  let lastToolLine;
  for (const [start, end] of getEdges(path)) {
    const direction = normalize(subtract(end, start));
    // The tool (with given radius) passes along the outside of the path.
    const rightAngle = Math.PI / -2;
    const toolEdgeOffset = rotateZ(direction, rightAngle);
    // And in order to get sharp angles with a circular tool we need to cut a bit further.
    const overcutOffset = scale(overcut, direction);
    const toolStart = subtract(add(start, toolEdgeOffset), overcutOffset);
    const toolEnd = add(add(start, toolEdgeOffset), overcutOffset);
    if (!toolpath) {
      toolpath = createOpenPath();
      toolpaths.push(toolpath);
    }
    if (solid) {
      // Produce a continuous path -- for, e.g., milling.
      const thisToolLine = fromPoints(toolStart, toolEnd);
      if (lastToolLine) {
        // The tool is at the end of the previous cut.
        // Bring it back along the cut to the point where it intersects this new toolpath.
        toolpath.push(intersect(thisToolLine, lastToolLine));
        // The tool will now be correctly placed to cut this toolpath.
      }
      // Remember for the next toolpath.
      lastToolLine = thisToolLine;
    }
    toolpath.push(toolStart, toolEnd);
    if (!solid) {
      // Start a distinct toolpath.
      toolpath = undefined;
    }
  }
  return toolpaths;
};

const toolpath = (geometry, radius = 1, overcut, solid = false) => {
  const toolpaths = [];
  for (const { paths } of getNonVoidPaths(geometry)) {
    for (const path of paths) {
      toolpaths.push(...toolpathEdges(path, radius, overcut, solid));
    }
  }
  return toolpaths;
};

export { toolpath };
