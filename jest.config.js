module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/__tests__/utils/testSetup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/utils/'],
};
