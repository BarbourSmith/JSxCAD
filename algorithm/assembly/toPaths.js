import { filterAndFlattenAssemblyData } from './filterAndFlattenAssemblyData';
import { toDisjointGeometry } from './toDisjointGeometry';
import { union } from '@jsxcad/algorithm-paths';

export const toPaths = ({ requires, excludes }, assembly) =>
  union(...filterAndFlattenAssemblyData({ requires, excludes, form: 'paths' }, toDisjointGeometry(assembly)));
