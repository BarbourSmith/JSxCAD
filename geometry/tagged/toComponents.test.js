import test from 'ava';
import { toComponents } from './toComponents';

test('Requires A', t => {
  const assembly = { assembly: [{ solid: [], tags: ['a'] },
                                { solid: [], tags: ['b'] },
                                { solid: [], tags: ['a', 'b'] }] };
  const components = toComponents({ requires: ['a'] }, assembly);
  t.deepEqual(components, [{ 'solid': [], 'tags': ['a', 'b'] },
                           { 'solid': [], 'tags': ['a'] }]);
});

test('Requires Deep A', t => {
  const assembly = { assembly: [{ assembly: [{ solid: [], tags: ['a'] }] },
                                { solid: [], tags: ['b'] },
                                { solid: [], tags: ['a', 'b'] }] };
  const components = toComponents({ requires: ['a'] }, assembly);
  t.deepEqual(components, [{ 'solid': [], 'tags': ['a', 'b'] },
                           { 'solid': [], 'tags': ['a'] }]);
});

test('Excludes B', t => {
  const assembly = { assembly: [{ solid: [], tags: ['a'] },
                                { solid: [], tags: ['b'] },
                                { solid: [], tags: ['a', 'b'] }] };
  const components = toComponents({ excludes: ['b'] }, assembly);
  t.deepEqual(components, [{ 'solid': [], 'tags': ['a'] }]);
});