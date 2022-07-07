module.exports = {
  extends: ['@carloscasalar/eslint-config-react-ts', 'plugin:storybook/recommended'],
  overrides: [{
    files: ['**/*.stories.*'],
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  }]
};