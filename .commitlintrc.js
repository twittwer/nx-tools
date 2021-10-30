module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.toLowerCase().startsWith('wip')],
  rules: {
    'scope-empty': [0],
    'scope-enum': [2, 'always', ['compodoc']],
  },
};
