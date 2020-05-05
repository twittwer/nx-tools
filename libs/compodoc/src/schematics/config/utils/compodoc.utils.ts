import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from './workspace.utils';
import { join } from 'path';
import { ProjectType } from '@nrwl/workspace';

export function getTsConfigForProject(tree: Tree, projectName: string): string {
  const { root: projectRoot, projectType } = getProjectConfig(
    tree,
    projectName,
  );

  let tsConfig = 'tsconfig.compodoc.json';
  if (!tree.exists(join(projectRoot, tsConfig))) {
    tsConfig =
      projectType === ProjectType.Application
        ? 'tsconfig.app.json'
        : 'tsconfig.lib.json';
  }
  if (!tree.exists(join(projectRoot, tsConfig))) {
    tsConfig = 'tsconfig.json';
  }
  if (!tree.exists(join(projectRoot, tsConfig))) {
    throw new Error(
      `Missing TSConfig: Cannot find a "tsconfig[.(compodoc|lib|app)].json" file in "${projectRoot}".`,
    );
  }
  return tsConfig;
}
