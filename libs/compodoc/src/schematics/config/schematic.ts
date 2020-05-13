import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  schematic,
  template,
  url,
} from '@angular-devkit/schematics';
import { getWorkspace, offsetFromRoot, updateWorkspace } from '@nrwl/workspace';
import { CompodocConfigSchema } from './schema';
import {
  getProjectConfig,
  getProjectDefinition,
} from './utils/workspace.utils';
import { TargetDefinition } from '@angular-devkit/core/src/workspace';
import {
  buildCompodocConfigurations,
  buildCompodocOptions,
} from './utils/target.utils';
import { getTsConfigForProject } from './utils/compodoc.utils';

function addCompodocTarget(schema: CompodocConfigSchema): Rule {
  return async (tree, context) => {
    const workspaceDefinition = await getWorkspace(tree);
    const projectDefinition = await getProjectDefinition(
      workspaceDefinition,
      schema.project,
    );

    const options = buildCompodocOptions(tree, schema);
    const configurations = buildCompodocConfigurations();

    const targetDefinition: TargetDefinition = {
      builder: '@twittwer/compodoc:compodoc',
      options,
      configurations,
    };
    projectDefinition.targets.add({ name: 'compodoc', ...targetDefinition });

    return updateWorkspace(workspaceDefinition);
  };
}

function addTsConfigForWorkspaceDocs(schema: CompodocConfigSchema): Rule {
  return async (tree, context) => {
    const { root: projectRoot, projectType } = getProjectConfig(
      tree,
      schema.project,
    );

    const tsConfig = getTsConfigForProject(tree, schema.project);
    if (tsConfig === 'tsconfig.compodoc.json') {
      context.logger.warn(
        'Skipping generation of "tsconfig.compodoc.json" file and using existing one.',
      );
      return;
    }

    return mergeWith(
      apply(url('./files'), [
        template({
          tsConfigBaseFile: tsConfig,
          offsetFromRoot: offsetFromRoot(projectRoot),
        }),
        move(projectRoot),
      ]),
    );
  };
}

export default function(schema: CompodocConfigSchema): Rule {
  return chain([
    schematic('ng-add', {}),
    ...(schema.workspaceDocs ? [addTsConfigForWorkspaceDocs(schema)] : []),
    addCompodocTarget(schema),
  ]);
}
