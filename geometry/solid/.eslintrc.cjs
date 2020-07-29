module.exports = {
  plugins: ['@jsxcad/eslint-plugin-typelint'],
  extends: ['standard', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  rules: {
    'max-len': [1, 120, 2],
    semi: [2, 'always'],
    'no-new-func': 0,
    indent: [
      0,
      2,
      {
        ArrayExpression: 'first',
        CallExpression: { arguments: 'first' },
        FunctionDeclaration: { body: 1, parameters: 'first' },
        FunctionExpression: { parameters: 'first' },
        ImportDeclaration: 'first',
        MemberExpression: 2,
        ObjectExpression: 'first',
        SwitchCase: 1,
        VariableDeclarator: 'first',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'space-before-function-paren': [0, 'ignore'],
    'comma-dangle': [0, 'ignore'],
    'space-in-parens': [0, 'ignore'],
    '@jsxcad/typelint/typecheck': ['warn', { cache: {} }],
  },
};
