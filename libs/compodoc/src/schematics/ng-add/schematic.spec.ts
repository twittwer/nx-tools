import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { readJsonInTree, readNxJsonInTree } from '@nrwl/workspace';

describe('Compodoc "ng-add" Schematic', () => {
  let baseTree: Tree;

  const testRunner = new SchematicTestRunner(
    '@twittwer/compodoc',
    join(__dirname, '../../../collection.json'),
  );

  beforeEach(() => {
    baseTree = Tree.empty();
    baseTree = createEmptyWorkspace(baseTree);
  });

  it('should add plugin & its peer dependencies as devDependencies', async () => {
    const tree = await testRunner
      .runSchematicAsync('ng-add', undefined, baseTree)
      .toPromise();

    const packageJson = readJsonInTree(tree, 'package.json');

    // plugin
    expect(packageJson.devDependencies['@twittwer/compodoc']).toBeDefined();
    expect(packageJson.dependencies['@twittwer/compodoc']).toBeUndefined();

    // peer dependencies
    expect(packageJson.devDependencies['@compodoc/compodoc']).toBeDefined();
  });

  it('should add "compodoc" as a cachable operation', async () => {
    const tree = await testRunner
      .runSchematicAsync('ng-add', undefined, baseTree)
      .toPromise();

    const nxJson = readNxJsonInTree(tree);
    const taskRunnerOptions = nxJson?.tasksRunnerOptions?.default?.options as {
      cacheableOperations: string[];
    };

    expect(taskRunnerOptions.cacheableOperations).toEqual(
      expect.arrayContaining(['compodoc']),
    );
  });
});
