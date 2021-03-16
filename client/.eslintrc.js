module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    semi: ['error', 'always'],
    'no-extra-semi': ['error'],
    'class-methods-use-this': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'key-spacing': [
      'error',
      {
        afterColon: true,
        mode: 'minimum',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
