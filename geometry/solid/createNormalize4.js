// The resolution is 1 / multiplier.
const multiplier = 1e5;

const X = 0;
const Y = 1;
const Z = 2;
const W = 3;

export const createNormalize4 = () => {
  const map = new Map();
  const normalize4 = (plane) => {
    // Apply a spatial quantization to the 4 dimensional coordinate.
    const nx = Math.round(plane[X] * multiplier);
    const ny = Math.round(plane[Y] * multiplier);
    const nz = Math.round(plane[Z] * multiplier);
    const nw = Math.round(plane[W] * multiplier);
    // Look for an existing inhabitant.
    const value = map.get(`${nx}/${ny}/${nz}/${nw}`);
    if (value !== undefined) {
      return value;
    }
    // One of the ~0 or ~1 values will match the rounded values above.
    // The other will match the adjacent cell.
    const nx0 = Math.floor(plane[X] * multiplier);
    const ny0 = Math.floor(plane[Y] * multiplier);
    const nz0 = Math.floor(plane[Z] * multiplier);
    const nw0 = Math.floor(plane[W] * multiplier);
    const nx1 = nx0 + 1;
    const ny1 = ny0 + 1;
    const nz1 = nz0 + 1;
    const nw1 = nw0 + 1;
    // Populate the space of the quantized value and its adjacencies.
    map.set(`${nx0}/${ny0}/${nz0}/${nw0}`, plane);
    map.set(`${nx0}/${ny0}/${nz0}/${nw1}`, plane);
    map.set(`${nx0}/${ny0}/${nz1}/${nw0}`, plane);
    map.set(`${nx0}/${ny0}/${nz1}/${nw1}`, plane);
    map.set(`${nx0}/${ny1}/${nz0}/${nw0}`, plane);
    map.set(`${nx0}/${ny1}/${nz0}/${nw1}`, plane);
    map.set(`${nx0}/${ny1}/${nz1}/${nw0}`, plane);
    map.set(`${nx0}/${ny1}/${nz1}/${nw1}`, plane);
    map.set(`${nx1}/${ny0}/${nz0}/${nw0}`, plane);
    map.set(`${nx1}/${ny0}/${nz0}/${nw1}`, plane);
    map.set(`${nx1}/${ny0}/${nz1}/${nw0}`, plane);
    map.set(`${nx1}/${ny0}/${nz1}/${nw1}`, plane);
    map.set(`${nx1}/${ny1}/${nz0}/${nw0}`, plane);
    map.set(`${nx1}/${ny1}/${nz0}/${nw1}`, plane);
    map.set(`${nx1}/${ny1}/${nz1}/${nw0}`, plane);
    map.set(`${nx1}/${ny1}/${nz1}/${nw1}`, plane);
    // This is now the normalized value for this region.
    return plane;
  };
  return normalize4;
};
