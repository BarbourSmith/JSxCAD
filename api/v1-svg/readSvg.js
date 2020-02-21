import Shape from '@jsxcad/api-v1-shape';
import { fromSvg } from '@jsxcad/convert-svg';
import { readFile } from '@jsxcad/sys';

export const readSvg = async (path, { src } = {}) => {
  let data = await readFile({ decode: 'utf8' }, `source/${path}`);
  if (data === undefined) {
    data = await readFile({ decode: 'utf8', sources: [src] }, `cache/${path}`);
  }
  return Shape.fromGeometry(await fromSvg(data));
};

export default readSvg;
