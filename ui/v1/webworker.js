/* global FileReaderSync, postMessage, onmessage:writable, self */

import * as sys from '@jsxcad/sys';

import baseApi, { evaluate } from '@jsxcad/api';
import hashSum from 'hash-sum';

// Compatibility with threejs.
self.window = {};

const resolveNotebook = async () => {
  await sys.resolvePending();
  // Update the notebook.
  const notebook = sys.getEmitted();
  // Resolve any promises.
  for (const note of notebook) {
    if (note.download) {
      for (const entry of note.download.entries) {
        entry.data = await entry.data;
      }
    }
  }
};

const say = (message) => postMessage(message);

const reportError = (error) => {
  const entry = { text: error.stack ? error.stack : error, level: 'serious' };
  const hash = hashSum(entry);
  sys.emit({ error: entry, hash });
  sys.log({
    op: 'text',
    text: error.stack ? error.stack : error,
    level: 'serious',
  });
};

sys.setPendingErrorHandler(reportError);

const agent = async ({ ask, question, statement }) => {
  await sys.log({ op: 'evaluate', status: 'run' });
  await sys.log({ op: 'text', text: 'Evaluation Started' });
  let onEmitHandler;
  if ((statement || question).touchFile) {
    const { path, workspace } = (statement || question).touchFile;
    await sys.touch(path, { workspace });
  } else if (question.staticView) {
    const { path, workspace, view, offscreenCanvas } = question.staticView;
    const geometry = await sys.readOrWatch(path, { workspace });
    const { staticView } = await import('@jsxcad/ui-threejs');
    await staticView(baseApi.Shape.fromGeometry(geometry), {
      ...view,
      canvas: offscreenCanvas,
    });
    const blob = await offscreenCanvas.convertToBlob({ type: 'image/png' });
    const dataURL = new FileReaderSync().readAsDataURL(blob);
    console.log(`QQ/rendered: ${path}`);
    return dataURL;
  } else if (question.evaluate) {
    sys.setupFilesystem({ fileBase: question.workspace });
    sys.clearEmitted();
    let nthNote = 0;
    onEmitHandler = sys.addOnEmitHandler(async (note, index) => {
      nthNote += 1;
      if (note.download) {
        for (const entry of note.download.entries) {
          entry.data = await entry.data;
        }
      }
      ask({ note, index });
    });
    try {
      const ecmascript = question.evaluate;
      const { path, sha = 'master' } = question;
      console.log({ op: 'text', text: `QQ/script: ${question.evaluate}` });
      console.log({ op: 'text', text: `QQ/ecmascript: ${ecmascript}` });
      const api = { ...baseApi, sha };
      const exports = await evaluate(ecmascript, { api, path });
      /*
      const builder = new Function(
        `{ ${Object.keys(api).join(', ')} }`,
        `return async () => { ${ecmascript} };`
      );
      const module = await builder(api);
      try {
        sys.pushModule(question.path);
        await module();
      } finally {
        sys.popModule();
      }
*/
      await sys.log({
        op: 'text',
        text: 'Evaluation Succeeded',
        level: 'serious',
      });
      await sys.log({ op: 'evaluate', status: 'success' });
      // Wait for any pending operations.
      return exports;
    } catch (error) {
      reportError(error);
      await sys.log({
        op: 'text',
        text: 'Evaluation Failed',
        level: 'serious',
      });
      await sys.log({ op: 'evaluate', status: 'failure' });
    } finally {
      await resolveNotebook();
      await sys.resolvePending();
      ask({ notebookLength: nthNote });
      sys.removeOnEmitHandler(onEmitHandler);
    }
    sys.setupFilesystem();
    return sys.getEmitted();
  }
};

// We need to start receiving messages immediately, but we're not ready to process them yet.
// Put them in a buffer.
const messageBootQueue = [];
onmessage = ({ data }) => messageBootQueue.push(data);

const bootstrap = async () => {
  const { ask, hear } = sys.conversation({ agent, say });
  self.ask = ask;
  // sys/log depends on ask, so set that up before we boot.
  await sys.boot();
  onmessage = ({ data }) => hear(data);
  // Now that we're ready, drain the buffer.
  if (self.messageBootQueue !== undefined) {
    while (self.messageBootQueue.length > 0) {
      hear(self.messageBootQueue.shift());
    }
  }
  while (messageBootQueue.length > 0) {
    hear(messageBootQueue.shift());
  }
  if (onmessage === undefined) throw Error('die');
};

bootstrap();
