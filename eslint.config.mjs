import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/coverage/**',
      '**/tsconfig.tsbuildinfo',
      '**/*.d.ts',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      'eslint.config.mjs',
      'tailwind.config.js',
      'postcss.config.js',
      'jest.config.ts',
    ],
  },
  ...nextConfig,
  prettierConfig,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      'no-extra-semi': 'error',
    },
  },
];
