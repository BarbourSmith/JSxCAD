/* global self */

import * as fs from 'fs';

import { isBrowser, isNode, isWebWorker } from './browserOrNode.js';

import { addPending } from './pending.js';
import { db } from './db.js';
import { deleteFile as deleteCachedFile } from './files.js';
import { qualifyPath } from './filesystem.js';

const { promises } = fs;

const getFileDeleter = async () => {
  if (isNode) {
    // FIX: Put this through getFile, also.
    return async (path) => {
      return promises.unlink(qualifyPath(path));
    };
  } else if (isBrowser) {
    return async (path) => {
      await db().removeItem(qualifyPath(path));
    };
  } else {
    throw Error('die');
  }
};

export const deleteFile = async (options, path) => {
  if (isWebWorker) {
    return addPending(self.ask({ op: 'deleteFile', options, path }));
  }
  const deleter = await getFileDeleter();
  await deleter(path);
  await deleteCachedFile(options, path);
};
