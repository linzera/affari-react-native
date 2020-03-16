/** @format */

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:jsx-control-statements/recommended',
  ],
  plugins: ['jsx-control-statements'],
  settings: {
    'import/resolver': 'babel-plugin-root-import',
  },
  rules: {
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'react-native/no-unused-styles': 1,
    'react-native/no-inline-styles': 1,
    'react-hooks/exhaustive-deps': 1,
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-unused-vars': 2,
  },
  env: {
    jest: true,
  },
};
