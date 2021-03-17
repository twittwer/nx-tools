import {
  apply,
  chain,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { WorkspaceCompodocStaticHtmlGeneratorSchema } from './schema';
import { getProjectConfig, ProjectConfig } from '../config/utils/workspace.utils';
import { join } from 'path';
import { groupBy, mapValues, omit } from 'lodash';
import { generateCompodocDocsForProjects, getProjects } from './utils';

/**
 * Creates a static website based on Compodoc with a clear overview of all applications and libraries available in an Nx workspace.
 * The website references the previous build Compodoc documentation sites for all provided projects.
 * You can simply navigate to those projects as they are referenced.
 * @param {WorkspaceCompodocStaticHtmlGeneratorSchema} schema
 * @returns {Rule}
 */
function addWorkspaceCompodocWebsite(
  schema: WorkspaceCompodocStaticHtmlGeneratorSchema,
): Rule {
  return async (tree, context) => {
    const { projects, all, outputPath } = schema;
    const projectList: string[] = await getProjects(
      tree,
      context,
      projects,
      all,
    );

    if (projectList?.length) {
      const projectConfigs: Array<{
        projectName: string;
      } & ProjectConfig> = projectList.map(project => ({
        ...getProjectConfig(tree, project),
        projectName: project,
      }));

      // this wil group all projects based on project type.
      // This makes it much easier to loop over and construct the html template for the workspace docs static website
      const groupedProjects = mapValues(
        groupBy(projectConfigs, 'projectType'),
        configs => configs.map(config => omit(config, 'projectType')),
      );

      return mergeWith(
        apply(url('./files'), [
          template({
            groupedProjects,
            workspaceName: process
              .cwd()
              .substring(process.cwd().lastIndexOf('/') + 1),
          }),
          move(outputPath ?? join('dist', 'compodoc')),
        ]),
      );
    }

    return noop();
  };
}

/**
 * Method which will build compodoc documentation for all available workspace projects or for a specific set of projects
 * @param {WorkspaceCompodocStaticHtmlGeneratorSchema} schema
 * @returns {Rule}
 */
function buildCompodocForProjects(
  schema: WorkspaceCompodocStaticHtmlGeneratorSchema,
): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const { projects, all, ...compodocOptions } = schema;

    if (!projects && !all) {
      context.logger.error('You should provide at least one project');
      return noop();
    } else {
      context.logger.info('Starting automated Compodoc build process...');
      const configuredProjects: string[] = await getProjects(
        tree,
        context,
        projects,
        all,
      );
      const operationRules: Rule[] = [];

      if (configuredProjects) {
        for (const project of configuredProjects) {
          operationRules.push(
            await generateCompodocDocsForProjects(
              tree,
              context,
              compodocOptions,
              project,
            ),
          );
        }
      }

      return chain(operationRules);
    }
  };
}

export default function(
  schema: WorkspaceCompodocStaticHtmlGeneratorSchema,
): Rule {
  return chain([
    schematic('ng-add', {}),
    buildCompodocForProjects(schema),
    addWorkspaceCompodocWebsite(schema),
  ]);
}
