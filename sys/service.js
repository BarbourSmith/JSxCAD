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

export const askService = (spec, question, transfer) => {
  let terminated = false;
  let terminate = () => {
    terminated = true;
  };
  const promise = new Promise((resolve, reject) => {
    let service;
    createService(spec)
      .then((createdService) => {
        service = createdService;
        terminate = () => {
          terminated = true;
          throw Error('Terminated');
        };
        if (terminated) {
          terminate();
        }
      })
      .then(() => service.ask(question, transfer))
      .then((answer) => {
        resolve(answer);
      })
      .catch((error) => {
        console.log(`QQ/askService: ${error.stack}`);
        reject(error);
      })
      .finally(() => {
        if (terminated) {
           service.terminate();
        }
        service.release(terminated);
      });
  });
  promise.terminate = () => terminate();
  return promise;
};
