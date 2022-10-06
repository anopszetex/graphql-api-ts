module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:promise/recommended',
    'eslint-config-prettier',
    'plugin:node/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:security-node/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'new-cap': 'off',
    'no-invalid-this': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'no-console': 2,
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'node/no-missing-import': 'off',
  },
};
