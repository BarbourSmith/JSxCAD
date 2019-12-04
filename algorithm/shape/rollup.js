import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';

Error.stackTraceLimit = Infinity;

export default {
  input: 'main.js',
  output: {
    dir: 'dist',
    format: 'module'
  },
  external(id) {
    return id.startsWith('@jsxcad/');
  },
  plugins: [
    builtins(),
    commonjs({
      namedExports: {
        './../node_modules/adaptive-bezier-curve/index.js': ['bezier']
      }
    }),
    globals(),
    nodeResolve({ preferBuiltins: true })
  ]
};
