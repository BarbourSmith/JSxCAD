const files = {};
const fileCreationWatchers = [];

export const getFile = (path) => {
  let file = files[path];
  if (file === undefined) {
    file = { path: path, watchers: [] };
    files[path] = file;
    for (const watcher of fileCreationWatchers) {
      watcher(file);
    }
  }
  return file;
};

export const watchFileCreation = (thunk) => fileCreationWatchers.push(thunk);
