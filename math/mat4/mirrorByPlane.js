const create = require('./create');

/**
 * Create an affine matrix for mirroring onto an arbitrary plane
 *
 * @param {vec4} plane to mirror the matrix by
 * @returns {mat4} out
 */
const mirrorByPlane = ([nx, ny, nz, w]) => {
  const out = create();
  out[0] = (1.0 - 2.0 * nx * nx);
  out[1] = (-2.0 * ny * nx);
  out[2] = (-2.0 * nz * nx);
  out[3] = 0;
  out[4] = (-2.0 * nx * ny);
  out[5] = (1.0 - 2.0 * ny * ny);
  out[6] = (-2.0 * nz * ny);
  out[7] = 0;
  out[8] = (-2.0 * nx * nz);
  out[9] = (-2.0 * ny * nz);
  out[10] = (1.0 - 2.0 * nz * nz);
  out[11] = 0;
  out[12] = (2.0 * nx * w);
  out[13] = (2.0 * ny * w);
  out[14] = (2.0 * nz * w);
  out[15] = 1;

  return out;
};

module.exports = mirrorByPlane;
