import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@nrwl/workspace';

export async function getProjects(tree: Tree, context: SchematicContext, projects: string, all: boolean): Promise<string[]> {
  const workspace = await getWorkspace(tree);
  const workspaceProjects: string [] = Array.from(workspace.projects.keys());

  if (projects) {
    return projects.split(',').reduce((acc, curr) => {
      if (!workspaceProjects.includes(curr)) {
        context.logger.error(`${curr} is not available in angular.json`);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  } else if (all) {
    process.getMaxListeners() < workspaceProjects.length && process.setMaxListeners(workspaceProjects.length + 1);
    return workspaceProjects;
  }
}
