import test from 'ava';
import { toEcmascript } from './toEcmascript';

Error.stackTraceLimit = Infinity;

test('Wrap and return.', t => {
  const ecmascript = toEcmascript({},
                                  `export const foo = (x) => x + 1;
                                   export const main = async () => {
                                     let a = 10;
                                     return circle(foo(a));
                                   }`);
  t.is(ecmascript,
       `return async () => {
  const foo = x => x + 1;
  const main = async () => {
    let a = 10;
    return circle(foo(a));
  };
  return {
    foo,
    main
  };
};
`);
});

test("Don't return declarations.", t => {
  const ecmascript = toEcmascript({},
                                  `let a = 10;`);
  t.is(ecmascript,
       `return async () => {
  const main = async () => {
    let a = 10;
  };
  return {
    main
  };
};
`);
});

test('Bind await to calls properly.', t => {
  const ecmascript = toEcmascript({}, `foo().bar()`);
  t.is(ecmascript,
       `return async () => {
  const main = async () => {
    return foo().bar();
  };
  return {
    main
  };
};
`);
});

test('Top level await.', t => {
  const ecmascript = toEcmascript({}, `await foo()`);
  t.is(ecmascript,
       `return async () => {
  const main = async () => {
    return await foo();
  };
  return {
    main
  };
};
`);
});

test('Wrap on long implicit return expression is not malformed.', t => {
  const ecmascript = toEcmascript({}, `
foo();
// Hello.
await bar({ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagh: 1 }, 2);
`);
  t.is(ecmascript,
       `return async () => {
  const main = async () => {
    foo();
    return await bar({
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagh: 1
    }, 2);
  };
  return {
    main
  };
};
`);
});

test('Source stays at top level to support import', t => {
  const ecmascript = toEcmascript({}, `source('a', 'b'); foo();`);
  t.is(ecmascript, `return async () => {
  source('a', 'b');
  const main = async () => {
    return foo();
  };
  return {
    main
  };
};
`);
});

test('Import', t => {
  const ecmascript = toEcmascript({}, 'import { foo } from "bar";');
  t.is(ecmascript, `return async () => {
  const {foo} = await importModule('bar');
  const main = async () => {};
  return {
    main
  };
};
`);
});

test('Default Import', t => {
  const ecmascript = toEcmascript({}, 'import Foo from "bar";');
  t.is(ecmascript, `return async () => {
  const Foo = (await importModule('bar')).default;
  const main = async () => {};
  return {
    main
  };
};
`);
});

test('Unassigned Import', t => {
  const ecmascript = toEcmascript({}, 'import "bar";');
  t.is(ecmascript, `return async () => {
  await importModule('bar');
  const main = async () => {};
  return {
    main
  };
};
`);
});
