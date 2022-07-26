const tsJest = require('ts-jest/jest-preset')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  ...tsJest,
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['<rootDir>/tests/**/*.unit.ts', '<rootDir>/tests/**/*.integration.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
