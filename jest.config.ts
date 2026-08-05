import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig: Config = {
  clearMocks: true,
  collectCoverageFrom: ['pages/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/' },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/specs/**/*.spec.ts?(x)',
    '<rootDir>/components/**/*.spec.ts?(x)',
    '<rootDir>/lib/**/*.spec.ts?(x)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-markdown|remark-parse|remark-rehype|unified|bail|devlop|is-plain-obj|mdast-util-to-hast|mdast-util-to-string|hast-util-to-jsx-runtime|hast-util-whitespace|vfile|vfile-matter|unist-util-visit|character-entities|comma-separated-tokens|property-information|space-separated-tokens|trim-lines|web-namespaces)/)',
  ],
};

export default createJestConfig(customJestConfig);