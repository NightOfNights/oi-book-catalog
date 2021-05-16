module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {
    'no-debugger': 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    quotes: [2, 'single', { avoidEscape: true }],
    semi: 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
