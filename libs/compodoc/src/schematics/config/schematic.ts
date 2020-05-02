import { Rule } from '@angular-devkit/schematics';
import { ProjectType, updateWorkspace } from '@nrwl/workspace';
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

function buildCompodocOptions(
  schema: CompodocConfigSchema,
  projectDefinition: TypedProjectDefinition,
): Partial<CompodocBuilderSchema> {
  let tsConfig =
    projectDefinition.extensions.projectType === ProjectType.Application
      ? `${projectDefinition.root}/tsconfig.app.json`
      : `${projectDefinition.root}/tsconfig.lib.json`;
  if (!existsSync(tsConfig)) {
    tsConfig = `${projectDefinition.root}/tsconfig.json`;
  }

  const outputPath = join('dist', 'compodoc', schema.project);

  return {
    tsConfig,
    outputPath,
  };
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

export default function(schema: CompodocConfigSchema): Rule {
  return addCompodocTarget(schema);
}
