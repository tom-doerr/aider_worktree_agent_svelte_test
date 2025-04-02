module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'svelte'],
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
