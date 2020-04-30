const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'compodoc',
  projectRoot: 'libs/compodoc',
  buildOutput: 'dist/libs/compodoc',
});
