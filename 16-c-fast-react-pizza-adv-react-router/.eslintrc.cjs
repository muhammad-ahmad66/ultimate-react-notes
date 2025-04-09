module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // Added Node.js environment
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Ensure .eslintrc.cjs is ignored
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: '18.2' },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn', // Treat unused vars as warnings
    'react/prop-types': 'off', // Disable prop-types validation
  },
};
