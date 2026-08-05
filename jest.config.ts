import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig: Config = {
  clearMocks: true,
  collectCoverageFrom: ['pages/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/',
    '^react-markdown$': '<rootDir>/test-mocks/react-markdown.tsx',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/specs/**/*.spec.ts?(x)', '<rootDir>/components/**/*.spec.ts?(x)', '<rootDir>/lib/**/*.spec.ts?(x)'],
};

export default createJestConfig(customJestConfig);