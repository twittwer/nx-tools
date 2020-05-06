import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { CompodocConfigSchema } from './schema';
import { getProjectConfig } from './utils/workspace.utils';

describe('Compodoc "config" Schematic', () => {
  let testTree: Tree;

  const testRunner = new SchematicTestRunner(
    '@twittwer/compodoc',
    join(__dirname, '../../../collection.json'),
  );

  beforeEach(() => {
    testTree = Tree.empty();
    createEmptyWorkspace(testTree);
  });

  describe('for library', () => {
    beforeEach(async () => {
      testTree = await testRunner
        .runExternalSchematicAsync(
          // TODO: should use `@nrwl/angular`
          '@nrwl/angular',
          'library',
          { name: 'test-lib' },
          testTree,
        )
        .toPromise();
    });

    it('should add "compodoc" target to project', async () => {
      const options: Partial<CompodocConfigSchema> = {
        project: 'test-lib',
      };
      await testRunner
        .runSchematicAsync('config', options, testTree)
        .toPromise();

      const projectConfig = getProjectConfig(testTree, 'test-lib');
      expect(projectConfig.architect['compodoc']).toEqual({
        builder: '@twittwer/compodoc:compodoc',
        options: {
          outputPath: 'dist/compodoc/test-lib',
          tsConfig: 'libs/test-lib/tsconfig.lib.json',
        },
        configurations: {
          json: {
            exportFormat: 'json',
          },
        },
      });
    });

    describe('should prefer more specific tsconfig files', () => {
      const possibleTsConfigFiles = [
        'libs/test-lib/tsconfig.compodoc.json',
        'libs/test-lib/tsconfig.lib.json',
        'libs/test-lib/tsconfig.json',
      ];
      const tsConfigCombinations = [
        possibleTsConfigFiles.slice(0),
        possibleTsConfigFiles.slice(1),
        possibleTsConfigFiles.slice(2),
      ];
      it.each(tsConfigCombinations)('%s', async (...tsConfigFiles) => {
        possibleTsConfigFiles.forEach(file => {
          const isPartOfTestCase = tsConfigFiles.includes(file);
          const existsInSetup = testTree.exists(file);
          if (isPartOfTestCase && !existsInSetup) {
            testTree.create(file, '');
          }
          if (!isPartOfTestCase && existsInSetup) {
            testTree.delete(file);
          }
        });

        const expectedTsConfig = tsConfigFiles[0];
        await testRunner
          .runSchematicAsync('config', { project: 'test-lib' }, testTree)
          .toPromise();

        const projectConfig = getProjectConfig(testTree, 'test-lib');
        expect(projectConfig.architect['compodoc'].options.tsConfig).toBe(
          expectedTsConfig,
        );
      });
    });
  });

  it.todo('for application');
  it.todo('--workspaceDocs');
});
