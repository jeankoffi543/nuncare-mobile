module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],
  moduleNameMapper: {
    '^react-native-bootsplash$':
      '<rootDir>/__mocks__/react-native-bootsplash.js',
  },
};
