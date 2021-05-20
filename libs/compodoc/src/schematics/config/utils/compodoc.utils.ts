import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from './workspace.utils';
import { join } from 'path';
import { ProjectType } from '@nrwl/workspace';

export function getTsConfigForProject(tree: Tree, projectName: string): string {
  const { root: projectRoot, projectType } = getProjectConfig(
    tree,
    projectName,
  );

  const tsConfigVariations = [
    'tsconfig.compodoc.json',
    ...{
      [ProjectType.Application]: ['tsconfig.editor.json', 'tsconfig.app.json'],
      [ProjectType.Library]: ['tsconfig.lib.json'],
    }[projectType],
    'tsconfig.json',
  ];
  const tsConfig = tsConfigVariations.find((_tsConfig) =>
    tree.exists(join(projectRoot, _tsConfig)),
  );

  if (!tsConfig) {
    throw new Error(
      `Missing TSConfig: Cannot find a "tsconfig[.(compodoc|lib|app)].json" file in "${projectRoot}".`,
    );
  }
  return tsConfig;
}
