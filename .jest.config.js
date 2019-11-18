module.exports = {
  collectCoverage: true,
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  rootDir: __dirname,
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testRegex: '.spec.*$',
  transform: {
    '.*.ts.?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'src/client/tsconfig.test.json'
    },
    __BASE_HREF__: process.env.BASE_HREF || '/',
    __SITE_SHORT_TITLE__: process.env.SITE_SHORT_TITLE || 'Test Short Title',
    __SITE_LONG_TITLE__: process.env.SITE_LONG_TITLE || 'Test Long Title'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // These must correspond to compilerOptions.paths in src/client/tsconfig.json
    '^@client(.*)$': '<rootDir>/src/client/$1',
    '^@components(.*)$': '<rootDir>/src/client/components/$1',
    '^@common(.*)$': '<rootDir>/src/common/$1',
    '^@server(.*)$': '<rootDir>/src/server/$1'
  },
  // Follows: https://www.npmjs.com/package/jest-fetch-mock
  automock: false,
  setupFiles: ['./src/client/setupJest.ts'],
  testURL: 'https://www.something.com/'
};
