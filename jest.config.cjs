module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.spec.js',
    '!src/**/*.test.js',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
