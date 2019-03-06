const equals = require('./equals');
const test = require('ava');

test('vec2: equals() should return correct booleans', (t) => {
  t.true(equals([0, 0], [0, 0]));
  t.false(equals([0, 0], [1, 1]));
  t.false(equals([0, 0], [1, 0]));
  t.false(equals([0, 0], [0, 1]));
});
