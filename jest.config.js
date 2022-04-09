require('dotenv').config({ path: '.env.jest' })
// const { pathsToModuleNameMapper } = require('ts-jest/utils')
// const { compilerOptions } = require('./tsconfig')
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // testTimeout: 720000,
  testTimeout: 60000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testEnvironment: '<rootDir>/tests/jest/mongodb.environment.ts',
  globals: {
    // 'ts-jest': {
    //   tsconfig: '<rootDir>/tsconfig.json',
    //   diagnostics: true
    // }
  },
  roots: [
    "tests"
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^#/(.*)$': '<rootDir>/tests/$1',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: [
    // '**/?(*.)+(spec|test).js?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  // coverageDirectory: './coverage',
  // collectCoverage: false,
  // collectCoverageFrom: [
  //   '**/src/**/*.ts',
  //   '!**/*.{test.ts,d.ts,js}',
  // ],
  globalSetup: '<rootDir>/tests/jest/global-setup.ts',
  globalTeardown: '<rootDir>/tests/jest/global-teardown.ts',
  // maxConcurrency: 2,
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest/setup.ts'
  ],
};
