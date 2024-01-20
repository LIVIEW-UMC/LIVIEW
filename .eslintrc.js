module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'operator-linebreak': 'off',
    'linebreak-style': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'max-len': 'off',
    devDependencies: false,
    optionalDependencies: false,
    peerDependencies: false,
  },
};
