it.todo('need some help with spawn error in tests');
// import { Tree } from '@angular-devkit/schematics';
// import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
// import { join } from 'path';
// import { createEmptyWorkspace } from '@nrwl/workspace/testing';
// import { allFilesInDirInHost } from '@nrwl/workspace/src/utils/ast-utils';
// import { normalize } from '@angular-devkit/core';
// import { HtmlWorkspaceGeneratorSchema } from './schema';
// import { ProjectType } from '@nrwl/workspace';
//
// describe('Compodoc "workspace html docs generator" Schematic', () => {
//   let testTree: Tree;
//
//   const testRunner = new SchematicTestRunner(
//     '@twittwer/compodoc',
//     join(__dirname, '../../../collection.json'),
//   );
//
//   beforeEach(() => {
//     testTree = Tree.empty();
//     testTree = createEmptyWorkspace(testTree);
//   });
//
//   describe.each`
//     projectType                | directory
//     ${ProjectType.Application} | ${undefined}
//     ${ProjectType.Library}     | ${undefined}
//   `(
//     'for $projectType in $directory directory',
//     ({ projectType, directory }) => {
//       const projectTypeSuffix = projectType.slice(0, 3);
//       const projectTypeRoot = `${projectTypeSuffix}s`;
//
//       const testProjectName = `test-${projectType}`;
//       const testProject = directory
//         ? `${directory}-${testProjectName}`
//         : testProjectName;
//       const testProjectRoot = directory
//         ? `${projectTypeRoot}/${directory}/${testProjectName}`
//         : `${projectTypeRoot}/${testProjectName}`;
//
//       beforeEach(async () => {
//         testTree = await testRunner
//           .runExternalSchematicAsync(
//             '@nrwl/angular',
//             projectType,
//             {
//               name: testProjectName,
//               directory,
//             },
//             testTree,
//           )
//           .toPromise();
//       });
//
//       it('should add compodoc documentation website for defined project', async () => {
//         const options: Partial<HtmlWorkspaceGeneratorSchema> = {
//           projects: testProject,
//           tsconfig: `${testProjectRoot}/tsconfig.json`,
//           outputPath: `dist/compodoc/${testProject}`
//         };
//         console.log(options);
//         testTree = await testRunner
//           .runSchematicAsync('workspace-html', options, testTree)
//           .toPromise();
//
//         console.log(testTree);
//         const compodocs = allFilesInDirInHost(testTree, normalize('dist/compodoc'));
//
//         console.log(compodocs);
//         // plugin
//
//         // peer dependencies
//         expect(compodocs[0]).toBe('');
//       });
//     });
// });
