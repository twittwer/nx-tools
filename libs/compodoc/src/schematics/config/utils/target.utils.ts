import { Tree } from '@angular-devkit/schematics';
import { CompodocConfigSchema } from '../schema';
import { CompodocBuilderSchema } from '@twittwer/compodoc';
import { getProjectConfig } from './workspace.utils';
import { join } from 'path';
import { getTsConfigForProject } from './compodoc.utils';

export function buildCompodocOptions(
  tree: Tree,
  schema: CompodocConfigSchema,
): Partial<CompodocBuilderSchema> {
  const { root: projectRoot } = getProjectConfig(tree, schema.project);

  const options: Partial<CompodocBuilderSchema> = {};

  options.tsConfig = join(
    projectRoot,
    getTsConfigForProject(tree, schema.project),
  );
  options.outputPath = join('dist', 'compodoc', schema.project);

  if (schema.workspaceDocs) {
    options.workspaceDocs = true;
  }

  return options;
}

export function buildCompodocConfigurations(): Record<
  string,
  Partial<CompodocBuilderSchema>
> {
  return {
    json: {
      exportFormat: 'json',
    },
  };
}
