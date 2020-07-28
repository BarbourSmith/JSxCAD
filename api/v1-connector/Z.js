import { Shape } from '@jsxcad/api-v1-shape';
import { toConnector } from './faceConnector.js';

// Ideally this would be a plane of infinite extent.
// Unfortunately this makes things like interpolation tricky,
// so we approximate it with a very large polygon instead.

export const Z = (z = 0) => {
  const size = 1e5;
  const min = -size;
  const max = size;
  // FIX: Why aren't we createing the connector directly?
  const sheet = Shape.fromPathToSurface([
    [max, min, z],
    [max, max, z],
    [min, max, z],
    [min, min, z],
  ]);
  return toConnector(sheet, sheet.toGeometry().surface, 'top');
};

export default Z;
