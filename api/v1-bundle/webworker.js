/* global postMessage, onmessage:writable, self */

import * as api from '@jsxcad/api-v1';
import * as sys from '@jsxcad/sys';
import { toEcmascript } from '@jsxcad/compiler';

Error.stackTraceLimit = Infinity;

const say = (message) => postMessage(message);
const agent = async ({ ask, question }) => {
  try {
    await sys.log({ op: 'clear' });
    await sys.log({ op: 'evaluate', status: 'run' });
    await sys.log('Evaluation Started');
    if (question.evaluate) {
      const ecmascript = toEcmascript({}, question.evaluate);
      console.log(`QQ/script: ${question.evaluate}`);
      console.log(`QQ/ecmascript: ${ecmascript}`);
      const builder = new Function(`{ ${Object.keys(api).join(', ')} }`, ecmascript);
      const constructor = await builder(api);
      const module = await constructor();
      const shape = await module.main();
      await sys.log('Evaluation Succeeded');
      await sys.log({ op: 'evaluate', status: 'success' });
      if (shape !== undefined && shape.toKeptGeometry) {
        const keptGeometry = shape.toKeptGeometry();
        return keptGeometry;
      }
    }
  } catch (error) {
    await sys.log(error.stack);
    await sys.log('Evaluation Failed');
    await sys.log({ op: 'evaluate', status: 'failure' });
  }
};
const { ask, hear } = sys.conversation({ agent, say });
self.ask = ask;
onmessage = ({ data }) => hear(data);
if (onmessage === undefined) throw Error('die');
