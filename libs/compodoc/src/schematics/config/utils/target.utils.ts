import { Tree } from '@angular-devkit/schematics';
import { CompodocConfigSchema } from '../schema';
import { CompodocBuilderSchema } from '../../../builders/compodoc/schema';
import { getProjectConfig } from './workspace.utils';
import { getTsConfigForProject } from './compodoc.utils';
import { joinPathFragments } from '@nrwl/devkit';

export function buildCompodocOptions(
  tree: Tree,
  schema: CompodocConfigSchema,
): Partial<CompodocBuilderSchema> {
  const { root: projectRoot } = getProjectConfig(tree, schema.project);

  const options: Partial<CompodocBuilderSchema> = {};

  options.tsConfig = joinPathFragments(
    projectRoot,
    getTsConfigForProject(tree, schema.project),
  );
  options.outputPath = joinPathFragments('dist', 'compodoc', schema.project);

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
