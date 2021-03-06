import { getFile } from './files.js';

export const watchFile = async (path, thunk) => {
  if (thunk) {
    (await getFile({}, path)).watchers.add(thunk);
    return thunk;
  }
};

export const unwatchFile = async (path, thunk) => {
  if (thunk) {
    return (await getFile({}, path)).watchers.delete(thunk);
  }
};
