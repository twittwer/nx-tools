import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { CompodocBuilderSchema } from './schema';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { buildCompodocArgs, buildCompodocCmd } from './compodoc-utils';
import { ProjectType } from '@nrwl/workspace';

async function runBuilder(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): Promise<BuilderOutput> {
  const {
    workspaceRoot,
    currentDirectory,
    target: { project, target, configuration },
  } = context;
  const projectMetadata = await context.getProjectMetadata(project);
  const { root: projectRoot, projectType } = projectMetadata as {
    root: string;
    projectType: ProjectType;
    target: string;
    configuration: string;
  };

  options.tsConfig = options.tsConfig ?? resolve(projectRoot, 'tsconfig.json');
  options.outputPath =
    options.outputPath ?? resolve('dist', 'compodoc', project);

  return new Promise<BuilderOutput>(res => {
    const childProcess = spawn(
      buildCompodocCmd(context),
      buildCompodocArgs(options, context),
      { cwd: projectRoot },
    );

    process.on('exit', () => childProcess.kill());

    childProcess.stdout.on('data', data => {
      context.logger.info(data.toString());
    });
    childProcess.stderr.on('data', data => {
      context.logger.error(data.toString());
    });

    childProcess.on('close', code => {
      res({ success: code === 0 });
    });
  });
}

export default createBuilder(runBuilder);
