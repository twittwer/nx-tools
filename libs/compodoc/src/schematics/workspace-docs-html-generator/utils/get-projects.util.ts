import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@nrwl/workspace';

/**
 * Retrieves all projects for a workspace. Dependent on the "all" or "projects" options a project list will be setup.
 * @param {Tree} tree
 * @param {SchematicContext} context
 * @param {string} projects
 * @param {boolean} all
 * @returns {Promise<string[]>}
 */
export async function getProjects(
  tree: Tree,
  context: SchematicContext,
  projects: string,
  all: boolean,
): Promise<string[]> {
  const workspace = await getWorkspace(tree);
  const workspaceProjects: string[] = Array.from(workspace.projects.keys());

  if (projects) {
    return projects.split(',').reduce((acc, curr) => {
      workspaceProjects.includes(curr)
        ? acc.push(curr)
        : context.logger.error(`${curr} does not exist in angular.json`);
      return acc;
    }, []);
  } else if (all) {
    process.getMaxListeners() < workspaceProjects.length &&
      process.setMaxListeners(workspaceProjects.length + 1);
    return workspaceProjects;
  }
}
