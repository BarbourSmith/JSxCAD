const vec2 = require('@jsxcad/math-vec2');

/**
 * Return the origin of the given line.
 *
 * @param {line2} line the 2D line of reference
 * @return {vec2} the origin of the line
 */
const origin = (line) => vec2.scale(line[2], line);

module.exports = origin;
