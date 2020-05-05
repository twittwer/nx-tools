import { Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace';

export function addCacheableOperation(operation: string): Rule {
  return updateJsonInTree('nx.json', nxJson => {
    if (
      !nxJson.tasksRunnerOptions?.default?.runner ||
      !Array.isArray(
        nxJson.tasksRunnerOptions?.default?.options?.cacheableOperations,
      )
    ) {
      return nxJson;
    }

    const isAlreadyCached = nxJson.tasksRunnerOptions.default.options.cacheableOperations.includes(
      operation,
    );
    if (!isAlreadyCached) {
      nxJson.tasksRunnerOptions.default.options.cacheableOperations.push(
        operation,
      );
    }

    return nxJson;
  });
}
