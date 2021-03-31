module.exports = {
  extends: ['@carloscasalar/eslint-config-react-ts'],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
