module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'airbnb-base'],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 0,
        'no-empty': 0,
        'no-param-reassign': 0,
        'max-len': [1, 120],
        semi: ['error', 'never'],
        'no-extra-semi': 'error',
        indent: ['error', 4],
        'import/no-extraneous-dependencies': 0,
        'no-unused-vars': 0,
        'global-require': 0,
        'import/no-dynamic-require': 0,
    },
}
