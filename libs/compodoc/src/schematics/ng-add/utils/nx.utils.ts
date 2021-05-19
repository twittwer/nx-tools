import { Rule } from '@angular-devkit/schematics';
import { readNxJsonInTree, updateJsonInTree } from '@nrwl/workspace';

interface TaskRunnerOptions {
  cacheableOperations: string[];
}

export function addCacheableOperation(operation: string): Rule {
  return (tree) => {
    const nxJson = readNxJsonInTree(tree);
    const defaultTaskRunnerOptions = nxJson.tasksRunnerOptions?.default
      ?.options as TaskRunnerOptions | undefined;

    if (
      !Array.isArray(defaultTaskRunnerOptions?.cacheableOperations) ||
      defaultTaskRunnerOptions.cacheableOperations.includes(operation)
    ) {
      return;
    }

    return updateJsonInTree('nx.json', (nxJson) => {
      nxJson.tasksRunnerOptions.default.options.cacheableOperations.push(
        operation,
      );
      return nxJson;
    });
  };
}
