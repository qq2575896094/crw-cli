module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'no-empty': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'no-unused-vars': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
  },
};
