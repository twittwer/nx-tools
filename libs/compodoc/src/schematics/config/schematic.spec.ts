import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { createEmptyWorkspace, getFileContent } from '@nrwl/workspace/testing';
import { CompodocConfigSchema } from './schema';
import { getProjectConfig } from './utils/workspace.utils';
import { ProjectType } from '@nrwl/workspace';

describe('Compodoc "config" Schematic', () => {
  let testTree: Tree;

  const testRunner = new SchematicTestRunner(
    '@twittwer/compodoc',
    join(__dirname, '../../../collection.json'),
  );

  beforeEach(() => {
    testTree = Tree.empty();
    testTree = createEmptyWorkspace(testTree);
  });

  it.todo('Test nested apps/libs when generated with --directory flag');

  describe.each`
    projectType                | directory
    ${ProjectType.Application} | ${undefined}
    ${ProjectType.Library}     | ${undefined}
    ${ProjectType.Application} | ${'nested'}
    ${ProjectType.Library}     | ${'nested'}
  `(
    'for $projectType in $directory directory',
    ({ projectType, directory }) => {
      const projectTypeSuffix = projectType.slice(0, 3);
      const projectTypeRoot = `${projectTypeSuffix}s`;

      const testProjectName = `test-${projectType}`;
      const testProject = directory
        ? `${directory}-${testProjectName}`
        : testProjectName;
      const testProjectRoot = directory
        ? `${projectTypeRoot}/${directory}/${testProjectName}`
        : `${projectTypeRoot}/${testProjectName}`;

      beforeEach(async () => {
        testTree = await testRunner
          .runExternalSchematicAsync(
            '@nrwl/angular',
            projectType,
            {
              name: testProjectName,
              directory,
            },
            testTree,
          )
          .toPromise();
      });

      it('should add "compodoc" target to project', async () => {
        const options: Partial<CompodocConfigSchema> = {
          project: testProject,
        };
        testTree = await testRunner
          .runSchematicAsync('config', options, testTree)
          .toPromise();

        const projectConfig = getProjectConfig(testTree, testProject);
        expect(projectConfig.architect['compodoc']).toEqual({
          builder: '@twittwer/compodoc:compodoc',
          options: {
            outputPath: `dist/compodoc/${testProject}`,
            tsConfig: `${testProjectRoot}/tsconfig.${projectTypeSuffix}.json`,
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
          `${testProjectRoot}/tsconfig.compodoc.json`,
          `${testProjectRoot}/tsconfig.${projectTypeSuffix}.json`,
          `${testProjectRoot}/tsconfig.json`,
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
          const options: Partial<CompodocConfigSchema> = {
            project: testProject,
          };
          await testRunner
            .runSchematicAsync('config', options, testTree)
            .toPromise();

          const projectConfig = getProjectConfig(testTree, testProject);
          expect(projectConfig.architect['compodoc'].options.tsConfig).toBe(
            expectedTsConfig,
          );
        });
      });

      describe('--workspaceDocs', () => {
        it('should activate "workspaceDocs" & use "tsconfig.compodoc.json" in the created "compodoc" target', async () => {
          const options: Partial<CompodocConfigSchema> = {
            project: testProject,
            workspaceDocs: true,
          };
          testTree = await testRunner
            .runSchematicAsync('config', options, testTree)
            .toPromise();

          const projectConfig = getProjectConfig(testTree, testProject);
          expect(projectConfig.architect['compodoc']).toEqual({
            builder: '@twittwer/compodoc:compodoc',
            options: {
              outputPath: `dist/compodoc/${testProject}`,
              tsConfig: `${testProjectRoot}/tsconfig.compodoc.json`,
              workspaceDocs: true,
            },
            configurations: {
              json: {
                exportFormat: 'json',
              },
            },
          });
        });

        describe('tsconfig.compodoc.json', () => {
          const tsConfigCompodoc = `${testProjectRoot}/tsconfig.compodoc.json`;

          it('should create a compodoc specific tsconfig file', async () => {
            const options: Partial<CompodocConfigSchema> = {
              project: testProject,
              workspaceDocs: true,
            };
            testTree = await testRunner
              .runSchematicAsync('config', options, testTree)
              .toPromise();

            expect(testTree.exists(tsConfigCompodoc)).toBe(true);
            const tsConfigContent = JSON.parse(
              getFileContent(testTree, tsConfigCompodoc),
            );
            expect(tsConfigContent).toMatchSnapshot();
            expect(tsConfigContent.extends).toEqual(
              `./tsconfig.${projectTypeSuffix}.json`,
            );
            const relativePathToWorkspace = directory ? '../../..' : '../..';
            expect(tsConfigContent.include).toEqual([
              `${relativePathToWorkspace}/apps/**/*.ts`,
              `${relativePathToWorkspace}/libs/**/*.ts`,
            ]);
          });

          describe('should extend most specific tsconfig files', () => {
            const possibleTsConfigFiles = [
              `tsconfig.${projectTypeSuffix}.json`,
              `tsconfig.json`,
            ];
            const tsConfigCombinations = [
              possibleTsConfigFiles.slice(0),
              possibleTsConfigFiles.slice(1),
            ];
            it.each(tsConfigCombinations)('%s', async (...tsConfigFiles) => {
              possibleTsConfigFiles.forEach(file => {
                const filePath = `${testProjectRoot}/${file}`;

                const isPartOfTestCase = tsConfigFiles.includes(file);
                const existsInSetup = testTree.exists(filePath);

                if (isPartOfTestCase && !existsInSetup) {
                  testTree.create(filePath, '');
                }
                if (!isPartOfTestCase && existsInSetup) {
                  testTree.delete(filePath);
                }
              });

              const expectedTsConfig = tsConfigFiles[0];
              const options: Partial<CompodocConfigSchema> = {
                project: testProject,
                workspaceDocs: true,
              };
              await testRunner
                .runSchematicAsync('config', options, testTree)
                .toPromise();

              const tsConfigContent = JSON.parse(
                getFileContent(testTree, tsConfigCompodoc),
              );
              expect(tsConfigContent).toMatchSnapshot();
              expect(tsConfigContent.extends).toEqual(`./${expectedTsConfig}`);
            });
          });

          it('should not override an existing file', async () => {
            const previousContent = 'MY PREVIOUS CONTENT';
            testTree.create(tsConfigCompodoc, previousContent);

            let logMessage: string;
            testRunner.logger.subscribe(
              logEntry => (logMessage = logEntry.message),
            );

            const options: Partial<CompodocConfigSchema> = {
              project: testProject,
              workspaceDocs: true,
            };
            testTree = await testRunner
              .runSchematicAsync('config', options, testTree)
              .toPromise();

            expect(logMessage).toEqual(
              'Skipping generation of "tsconfig.compodoc.json" file and using existing one.',
            );

            const projectConfig = getProjectConfig(testTree, testProject);
            expect(
              projectConfig.architect['compodoc'].options.tsConfig,
            ).toEqual(tsConfigCompodoc);

            expect(getFileContent(testTree, tsConfigCompodoc)).toEqual(
              previousContent,
            );
          });
        });
      });
    },
  );
});
