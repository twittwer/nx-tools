import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  template,
  url,
} from '@angular-devkit/schematics';
import {
  getWorkspace,
  offsetFromRoot,
  ProjectType,
  updateWorkspace,
} from '@nrwl/workspace';
import { CompodocConfigSchema } from './schema';
import {
  ProjectDefinition,
  TargetDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';
import { CompodocBuilderSchema } from '../../builders/compodoc/schema';
import { join } from 'path';
import { existsSync } from 'fs';

type TypedProjectDefinition = Omit<ProjectDefinition, 'extensions'> & {
  extensions: ProjectDefinition['extensions'] & { projectType: ProjectType };
};

function getProject(
  workspace: WorkspaceDefinition,
  projectName: string,
): TypedProjectDefinition {
  return workspace.projects.get(projectName) as TypedProjectDefinition;
}

function getTsConfig(
  schema: CompodocConfigSchema,
  projectDefinition: TypedProjectDefinition,
): string {
  let tsConfig = `${projectDefinition.root}/tsconfig.compodoc.json`;
  if (!existsSync(tsConfig)) {
    tsConfig =
      projectDefinition.extensions.projectType === ProjectType.Application
        ? `${projectDefinition.root}/tsconfig.app.json`
        : `${projectDefinition.root}/tsconfig.lib.json`;
  }
  if (!existsSync(tsConfig)) {
    tsConfig = `${projectDefinition.root}/tsconfig.json`;
  }
  return tsConfig;
}

function buildCompodocOptions(
  schema: CompodocConfigSchema,
  projectDefinition: TypedProjectDefinition,
): Partial<CompodocBuilderSchema> {
  const options: Partial<CompodocBuilderSchema> = {};

  options.tsConfig = getTsConfig(schema, projectDefinition);
  options.outputPath = join('dist', 'compodoc', schema.project);

  if (schema.workspaceDocs) {
    options.workspaceDocs = true;
  }

  return options;
}

function buildCompodocConfigurations(): Record<
  string,
  Partial<CompodocBuilderSchema>
> {
  return {
    json: {
      exportFormat: 'json',
    },
  };
}

function addCompodocTarget(schema: CompodocConfigSchema): Rule {
  return updateWorkspace(workspace => {
    const projectDefinition = getProject(workspace, schema.project);

    const options = buildCompodocOptions(schema, projectDefinition);
    const configurations = buildCompodocConfigurations();

    projectDefinition.targets.set('compodoc', {
      builder: '@twittwer/compodoc:compodoc',
      options,
      configurations,
    } as TargetDefinition);
  });
}

function addTsConfigForWorkspaceDocs(schema: CompodocConfigSchema): Rule {
  return async (tree, context) => {
    const workspaceDefinition = await getWorkspace(tree);
    const projectDefinition = getProject(workspaceDefinition, schema.project);

    const tsConfigPath = join(projectDefinition.root, 'tsconfig.compodoc.json');

    if (existsSync(tsConfigPath)) {
      context.logger.warn(
        'Skipping generation of "tsconfig.compodoc.json" file and using existing one.',
      );
      return;
    }

    let tsConfigBaseFile =
      projectDefinition.extensions.projectType === ProjectType.Application
        ? 'tsconfig.app.json'
        : 'tsconfig.lib.json';
    if (!existsSync(`${projectDefinition.root}/${tsConfigBaseFile}`)) {
      tsConfigBaseFile = 'tsconfig.json';
    }

    return mergeWith(
      apply(url('./files'), [
        template({
          tsConfigBaseFile,
          offsetFromRoot: offsetFromRoot(projectDefinition.root),
        }),
        move(projectDefinition.root),
      ]),
    );
  };
}

export default function(schema: CompodocConfigSchema): Rule {
  return chain([
    ...(schema.workspaceDocs ? [addTsConfigForWorkspaceDocs(schema)] : []),
    addCompodocTarget(schema),
  ]);
}
