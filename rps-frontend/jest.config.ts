import type {Config} from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true
    }
  }
};

export default config;
