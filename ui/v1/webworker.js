/* global postMessage, onmessage:writable, self */

import * as baseApi from '@jsxcad/api-v1';
import * as sys from '@jsxcad/sys';
import hashSum from 'hash-sum';

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

const agent = async ({ ask, question }) => {
  await sys.log({ op: 'evaluate', status: 'run' });
  await sys.log({ op: 'text', text: 'Evaluation Started' });
  let onEmitHandler;
  if (question.touchFile) {
    const { path, workspace } = question.touchFile;
    await sys.touch(path, { workspace });
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
      console.log({ op: 'text', text: `QQ/script: ${question.evaluate}` });
      console.log({ op: 'text', text: `QQ/ecmascript: ${ecmascript}` });
      const api = { ...baseApi, sha: question.sha || 'master' };
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
      await sys.log({
        op: 'text',
        text: 'Evaluation Succeeded',
        level: 'serious',
      });
      await sys.log({ op: 'evaluate', status: 'success' });
      // Wait for any pending operations.
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
  await sys.boot();
  const { ask, hear } = sys.conversation({ agent, say });
  self.ask = ask;
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
