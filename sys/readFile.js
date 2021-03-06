/* global self */
// FIX: Refactor this once we figure it out.

import * as fs from 'fs';
import * as v8 from 'v8';

import {
  getBase,
  getFilesystem,
  qualifyPath,
  setupFilesystem,
} from './filesystem.js';

import { isBrowser, isNode, isWebWorker } from './browserOrNode.js';

import { unwatchFile, watchFile } from './watchFile.js';

import { db } from './db.js';
import { getFile } from './files.js';
import { info } from './emit.js';
import { log } from './log.js';
import nodeFetch from 'node-fetch';
import { writeFile } from './writeFile.js';

const { promises } = fs;
const { deserialize } = v8;

const getUrlFetcher = async () => {
  if (isBrowser) {
    return window.fetch;
  }
  if (isWebWorker) {
    return self.fetch;
  }
  if (isNode) {
    return nodeFetch;
  }
  throw Error('die');
};

const getFileFetcher = async (qualify = qualifyPath, doSerialize = true) => {
  if (isNode) {
    // FIX: Put this through getFile, also.
    return async (path) => {
      let data = await promises.readFile(qualify(path));
      if (doSerialize) {
        data = deserialize(data);
      }
      return data;
    };
  } else if (isBrowser || isWebWorker) {
    return async (path) => {
      const data = await db().getItem(qualify(path));
      if (data !== null) {
        return data;
      }
    };
  } else {
    throw Error('die');
  }
};

// Fetch from internal store.
const fetchPersistent = async (path, doSerialize) => {
  try {
    const base = getBase();
    if (base !== undefined) {
      const fetchFile = await getFileFetcher(qualifyPath, doSerialize);
      const data = await fetchFile(path);
      return data;
    }
  } catch (e) {
    if (e.code && e.code === 'ENOENT') {
      return;
    }
    console.log(e);
  }
};

// Fetch from external sources.
const fetchSources = async (sources) => {
  const fetchUrl = await getUrlFetcher();
  const fetchFile = await getFileFetcher((path) => path, false);
  // Try to load the data from a source.
  for (const source of sources) {
    if (typeof source === 'string') {
      try {
        if (source.startsWith('http:') || source.startsWith('https:')) {
          log({ op: 'text', text: `# Fetching ${source}` });
          info(`Fetching url ${source}`);
          const response = await fetchUrl(source, { cache: 'reload' });
          if (response.ok) {
            return new Uint8Array(await response.arrayBuffer());
          }
        } else {
          log({ op: 'text', text: `# Fetching ${source}` });
          info(`Fetching file ${source}`);
          // Assume a file path.
          const data = await fetchFile(source);
          if (data !== undefined) {
            return data;
          }
        }
      } catch (e) {}
    } else {
      throw Error('die');
    }
  }
};

// Deprecated
export const readFile = async (options, path) => {
  const {
    allowFetch = true,
    ephemeral,
    sources = [],
    workspace = getFilesystem(),
    useCache = true,
    decode,
  } = options;
  let originalWorkspace = getFilesystem();
  if (workspace !== originalWorkspace) {
    log({ op: 'text', text: `Read ${path} of ${workspace}` });
    // Switch to the source filesystem, if necessary.
    setupFilesystem({ fileBase: workspace });
  } else {
    log({ op: 'text', text: `Read ${path}` });
    // info(`Read ${path}`);
  }
  const file = await getFile(options, path);
  if (file.data === undefined || useCache === false) {
    file.data = await fetchPersistent(path, true);
  }
  if (workspace !== originalWorkspace) {
    // Switch back to the original filesystem, if necessary.
    setupFilesystem({ fileBase: originalWorkspace });
  }
  if (file.data === undefined && allowFetch && sources.length > 0) {
    let data = await fetchSources(sources);
    if (decode) {
      data = new TextDecoder(decode).decode(data);
    }
    if (!ephemeral && file.data !== undefined) {
      // Update persistent cache.
      await writeFile({ ...options, doSerialize: true }, path, data);
    }
    // The writeFile above can trigger a touch which can invalidate the cache
    // so we need to set the cached value after that is resolved.
    file.data = data;
  }
  if (file.data !== undefined) {
    if (file.data.then) {
      // Resolve any outstanding promises.
      file.data = await file.data;
    }
  }
  info(`Read complete: ${path} ${file.data ? 'present' : 'missing'}`);
  return file.data;
};

export const read = async (path, options = {}) => readFile(options, path);

export const readOrWatch = async (path, options = {}) => {
  const data = await read(path);
  if (data !== undefined) {
    return data;
  }
  let resolveWatch;
  const watch = new Promise((resolve) => {
    resolveWatch = resolve;
  });
  const watcher = await watchFile(path, (file) => resolveWatch(path));
  await watch;
  await unwatchFile(path, watcher);
  return read(path);
};
