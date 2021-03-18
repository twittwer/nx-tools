import { noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CompodocBuilderSchema } from '@twittwer/compodoc';
import { getProjectConfig } from '../../config/utils/workspace.utils';
import { spawnCompodocProcess } from '../../../builders/compodoc/compodoc-utils';
import { resolve } from 'path';

export function generateCompodocDocsForProjects(
  tree: Tree,
  context: SchematicContext,
  options: CompodocBuilderSchema,
  project: string,
): Promise<Rule> {
  return new Promise<Rule>(res => {
    const config = getProjectConfig(tree, project);
    const childProcess = spawnCompodocProcess(
      {
        ...options,
        tsConfig: options.tsConfig ?? resolve(config.root, 'tsconfig.json'),
        outputPath: options.outputPath
          ? resolve(options.outputPath, project)
          : resolve('dist', 'compodoc', project),
      },
      {
        workspaceRoot: process.cwd(),
        project,
        projectRoot: config.root,
      },
    );

    process.on('exit', () => childProcess.kill());

    childProcess.stdout.on('data', () => {
      context.logger.info(
        `Starting building ${project} Compodoc documentation...`,
      );
    });

    childProcess.stderr.on('data', data => {
      context.logger.error(
        `${project} Building Compodoc documentation encountered an error: `,
        data,
      );
    });

    childProcess.on('close', () => {
      context.logger.info(
        `${project} Compodoc documentation has successfully build\n====================================\n`,
      );
      res(noop());
    });
  });
}
