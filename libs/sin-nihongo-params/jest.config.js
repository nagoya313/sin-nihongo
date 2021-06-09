module.exports = {
  displayName: 'sin-nihongo-params',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/sin-nihongo-params',
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/test/jest-matchers/properties.ts'],
};
