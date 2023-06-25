import {
  ensureNxProject,
  readJson,
  runNxCommandAsync,
} from '@nx/plugin/testing';

describe('compodoc e2e', () => {
  const appName = 'my-e2e-app';
  const timeout = 120000;

  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(async () => {
    ensureNxProject('@twittwer/compodoc', 'dist/packages/compodoc');
    await runNxCommandAsync(`generate @nx/node:application ${appName}`);
  }, timeout);

  afterAll(async () => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    await runNxCommandAsync('reset');
  });

  it(
    'should run the compodoc generator',
    async () => {
      await runNxCommandAsync(`generate @twittwer/compodoc:config ${appName}`);

      const packageJson = readJson('package.json');
      const projectJson = readJson(`apps/${appName}/project.json`);
      const compodocTarget = projectJson.targets.compodoc;

      expect(packageJson.devDependencies).toHaveProperty('@compodoc/compodoc');
      expect(compodocTarget).toBeDefined();
      expect(compodocTarget).toMatchObject({
        executor: expect.any(String),
        options: expect.any(Object),
        configurations: expect.any(Object),
      });
    },
    timeout,
  );
});
