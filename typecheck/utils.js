import { Type, TypeContext } from './Type.js';
import { getFileInfoCache, setFileInfoCache } from './fileInfoCache.js';
import { getTypedefCache, setTypedefCache } from './typedefCache.js';

import Fs from 'fs';
import { Parser } from 'acorn/dist/acorn.mjs';
import Path from 'path';
import ResolveFrom from 'resolve-from';
import doctrine from 'doctrine';
import estraverse from 'estraverse';
import scan from 'scope-analyzer';

const setCaches = (settings) => {
  if (settings.fileInfoCache === undefined) {
    settings.fileInfoCache = {};
  }
  setFileInfoCache(settings.fileInfoCache);

  if (settings.typedefCache === undefined) {
    settings.typedefCache = {};
  }
  setTypedefCache(settings.typedefCache);
};

const parseJsdocComments = (programNode, context) => {
  for (const statement of programNode.body) {
    switch (statement.type) {
      case 'ImportDeclaration':
        if (statement.specifiers.length === 0) {
          // Eagerly handle "import `./foo.js`;" since we can't get inside them otherwise.
          getContextForFile(statement.source.value, context);
        }
        break;
    }
  }
  for (const { type, value, loc } of programNode.comments) {
    if (type !== 'Block') continue;
    if (!value.startsWith('*')) continue;
    Type.parseComment(
      loc.end.line + 1,
      `/*${value}*/`,
      getTypeContext(context)
    );
  }
};

const getTypedefs = (context) => getTypedefCache();

const parseFile = (filename, fileContents, context) => {
  const comments = [];
  const tokens = [];
  const ast = Parser.parse(fileContents, {
    sourceType: 'module',
    sourceFile: filename,
    locations: true,
    ranges: true,
    onComment: comments,
    onToken: tokens,
  });
  estraverse.attachComments(ast, comments, tokens);
  ast.comments = comments;
  return ast;
};

const resolve = (path, context) => {
  const directory = Path.dirname(context.getFilename());
  if (path.startsWith('/')) {
    return path;
  } else if (path.startsWith('.')) {
    return Path.join(directory, path);
  } else {
    // This should be a bare identifier -- try module resolution.
    try {
      return ResolveFrom(directory, path);
    } catch (error) {
      console.log(`QQ/resolve/path: ${path}`);
      console.log(`QQ/resolve/directory: ${directory}`);
      console.log(`QQ/resolve: ${error.stack}`);
      throw error;
    }
  }
};

const importModule = (path, context) => {
  // FFR: see import.meta.resolve
  try {
    const fsPath = resolve(path, context);
    const externalContext = getContextForFile(fsPath, context);
    return getTypeContext(externalContext);
  } catch (error) {
    console.log(`QQ/importModule: ${error.toString()}`);
  }
};

const acquireBinding = (node) => {
  switch (node.type) {
    case 'Identifier':
      return scan.getBinding(node);

    case 'MemberExpression':
      return acquireBinding(node.property);

    default:
      throw Error(`Unexpected type for acquireBinding: ${node.type} ${node}`);
  }
};

const getDefaultExportDeclaration = (context) => {
  const { programNode } = getFileInfo(context);

  if (!programNode) {
    // The content of this file is inaccessible.
    return;
  }

  for (const node of programNode.body) {
    if (node.type === 'ExportDefaultDeclaration') {
      return node.declaration;
    }
  }
};

const getNamedExportType = (path, symbolName, context) => {
  const externalContext = getContextForFile(path, context);
  const { programNode } = getFileInfo(externalContext);

  if (!programNode) {
    // The content of this file is inaccessible.
    return Type.any;
  }

  for (const node of programNode.body) {
    if (node.type !== 'ExportNamedDeclaration') {
      continue;
    }
    for (const specifier of node.specifiers) {
      if (specifier.exported.name === symbolName) {
        if (node.source && node.source.value) {
          return getNamedExportType(
            node.source.value,
            specifier.local.name,
            externalContext
          );
        } else {
          return resolveType(specifier.local, externalContext);
        }
      }
    }
    if (node.declaration) {
      if (!node.declaration.declarations) {
        console.log(`Unexpected node.declaration.declarations`);
      } else {
        for (const declaration of node.declaration.declarations) {
          if (declaration.id.name === symbolName) {
            return resolveType(declaration.id, externalContext);
          }
        }
      }
    }
  }

  return Type.any;
};

const resolveType = (node, context) =>
  Type.fromNode(node, getTypeContext(context));

const getTypeContext = (context) => {
  const fileInfo = getFileInfo(context);
  if (!fileInfo.typeContext) {
    fileInfo.typeContext = new TypeContext({
      typedefs: getTypedefs(context),
      acquireBinding: acquireBinding,
      importModule: (path) => importModule(path, context),
      getDefaultExportDeclaration: () => getDefaultExportDeclaration(context),
      getNamedExportType: (path, symbolName) =>
        getNamedExportType(path, symbolName, context),
      filename: context.getFilename(),
      parseComment: doctrine.parse,
      parseType: doctrine.parseType,
      getComments: (node) => context.getComments(node),
    });
  }
  return fileInfo.typeContext;
};

const getFileInfo = (context) => {
  const fileInfoCache = getFileInfoCache();
  const filename = context.getFilename();

  if (!filename) {
    // The import could not be resolved, so we will have no information
    // about it.
    return {};
  } else if (!fileInfoCache[filename]) {
    // console.log(`Loading ${filename}`);
    fileInfoCache[filename] = {};
    const fileContent = Fs.readFileSync(filename).toString();
    const programNode = parseFile(filename, fileContent, context);
    // Adds fileInfoCache entry.
    storeProgram(programNode, context);
  }

  return fileInfoCache[filename];
};

const getContextForFile = (fsPath, currentContext) => {
  const resolvedPath = resolve(fsPath, currentContext);

  if (resolvedPath === currentContext.getFilename()) {
    return currentContext;
  }

  const newContext = {};

  // Copy own and inherited properties.
  for (let i in currentContext) {
    newContext[i] = currentContext[i];
  }

  // If the path couldn't be resolved, this will yield 'undefined'.
  newContext.getFilename = () => resolvedPath;

  // Prime the cache eagerly so that typedefs are in place.
  getFileInfo(newContext);

  return newContext;
};

/**
 * @mutates
 */
const addAST = (programNode) => {
  scan.createScope(programNode, []);
  scan.crawl(programNode);

  return programNode;
};

const storeProgram = (programNode, context) => {
  const fileInfoCache = getFileInfoCache();
  addAST(programNode);
  fileInfoCache[context.getFilename()] = {
    context,
    programNode,
  };
  parseJsdocComments(programNode, context);
};

/**
 * @param {Node} node
 * @param {Context} context
 * @return {Type[]}
 */
const getArgumentsForFunctionCall = (node, context) =>
  node.arguments.map((arg) => resolveType(arg, context));

const getNameOfCalledFunction = (node, context) => {
  if (node.type !== 'CallExpression') {
    throw Error(`Unexpected type for getNameOfCalledFunction: ${node.type}`);
  }

  switch (node.callee.type) {
    case 'MemberExpression':
      return node.callee.property.name;

    default:
      return node.callee.name;
  }
};

const getContainingFunctionDeclaration = (node, context) => {
  let funcDecl = node;
  while (
    funcDecl &&
    funcDecl.type !== 'FunctionDeclaration' &&
    funcDecl.type !== 'FunctionExpression' &&
    funcDecl.type !== 'ArrowFunctionExpression'
  ) {
    funcDecl = funcDecl.parent;
  }
  return funcDecl;
};

export {
  getArgumentsForFunctionCall,
  getContainingFunctionDeclaration,
  getContextForFile,
  getFileInfo,
  getNameOfCalledFunction,
  resolveType,
  setCaches,
  storeProgram,
};
