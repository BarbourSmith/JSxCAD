import { isBrowser, isNode } from './browserOrNode.js';

import { nodeService } from './nodeService.js';
import { webService } from './webService.js';

// Sets up a worker with conversational interface.
export const createService = async ({
  nodeWorker,
  webWorker,
  agent,
  workerType,
}) => {
  if (isNode) {
    return nodeService({ nodeWorker, webWorker, agent, workerType });
  } else if (isBrowser) {
    return webService({ nodeWorker, webWorker, agent, workerType });
  } else {
    throw Error('die');
  }
};

export const askService = async (spec, question) => {
  const { ask, release } = await createService(spec);
  const answer = await ask(question);
  await release();
  return answer;
};
