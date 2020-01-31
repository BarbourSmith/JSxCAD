/**
 *
 * Defines the interface used by the api to access the rest of the system on
 * behalf of a user. e.g., algorithms and geometries.
 *
 * A user can destructively update this mapping in their code to change what
 * the api uses.
 */

import './view';

import * as v1 from '@jsxcad/api-v1';
import Font from '@jsxcad/api-v1-font';

import { boot } from '@jsxcad/sys';

export const api = async () => {
  await boot();
  return {
    ...v1,
    Font
  };
};
