/* global postMessage, onmessage:writable, self */

import * as api from '@jsxcad/api-v1';
import * as sys from '@jsxcad/sys';
import { toEcmascript } from '@jsxcad/compiler';

const say = (message) => postMessage(message);
const agent = async ({ ask, question }) => {
  try {
    await sys.log({ op: 'clear' });
    await sys.log({ op: 'evaluate', status: 'run' });
    await sys.log({ op: 'text', text: 'Evaluation Started' });
    if (question.evaluate) {
      sys.clearEmitted();
      const ecmascript = toEcmascript({}, question.evaluate);
      console.log({ op: 'text', text: `QQ/script: ${question.evaluate}` });
      console.log({ op: 'text', text: `QQ/ecmascript: ${ecmascript}` });
      const builder = new Function(`{ ${Object.keys(api).join(', ')} }`, ecmascript);
      const constructor = await builder(api);
      const module = await constructor();
      await module.main();
      await sys.log({ op: 'text', text: 'Evaluation Succeeded', level: 'serious' });
      await sys.log({ op: 'evaluate', status: 'success' });
      // Wait for any pending operations.
      sys.resolvePending();
      // Update the notebook.
      await sys.writeFile({}, 'notebook', sys.getEmitted());
    }
  } catch (error) {
    await sys.log({ op: 'text', text: error.stack, level: 'serious' });
    await sys.log({ op: 'text', text: 'Evaluation Failed', level: 'serious' });
    await sys.log({ op: 'evaluate', status: 'failure' });
  }
};

const bootstrap = async () => {
  await sys.boot();
  const { ask, hear } = sys.conversation({ agent, say });
  self.ask = ask;
  onmessage = ({ data }) => hear(data);
  if (onmessage === undefined) throw Error('die');
};

bootstrap();
