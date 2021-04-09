import { BuilderContext } from '@angular-devkit/architect';
import { join, relative, resolve } from 'path';
import { CompodocBuilderSchema } from './schema';
import { readJsonFile, readWorkspaceJson } from '@nrwl/workspace';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'fs';
import { ChildProcess, spawn } from 'child_process';

function buildCompodocCmd(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string {
  const { workspaceRoot } = context;
  return resolve(workspaceRoot, 'node_modules', '.bin', 'compodoc');
}

function buildNodemonCmd(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string {
  const { workspaceRoot } = context;
  return resolve(workspaceRoot, 'node_modules', '.bin', 'nodemon');
}

function createIncludesFolderForWorkspace(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string {
  const { workspaceRoot } = context;
  const { projects } = readWorkspaceJson() as WorkspaceSchema;

  const tmpFolder = mkdtempSync('tmp/compodoc_');

  const summary = Object.entries(projects)
    .map(([projectName, project]) => {
      const projectReadme = `${projectName}.md`;
      const projectReadmeOrigin = join(project.root, 'README.md');

      if (existsSync(projectReadmeOrigin)) {
        copyFileSync(projectReadmeOrigin, join(tmpFolder, projectReadme));
        return {
          title: projectName,
          file: projectReadme,
        };
      }
    })
    .filter(Boolean);

  writeFileSync(join(tmpFolder, 'summary.json'), JSON.stringify(summary));

  return relative(workspaceRoot, tmpFolder);
}

function buildDisableArgs(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string[] {
  const args = [];

  if (options.disableCoverage) {
    args.push('--disableCoverage');
  }
  if (options.disableSourceCode) {
    args.push('--disableSourceCode');
  }
  if (options.disableDomTree) {
    args.push('--disableDomTree');
  }
  if (options.disableTemplateTab) {
    args.push('--disableTemplateTab');
  }
  if (options.disableStyleTab) {
    args.push('--disableStyleTab');
  }
  if (options.disableGraph) {
    args.push('--disableGraph');
  }
  if (options.disablePrivate) {
    args.push('--disablePrivate');
  }
  if (options.disableProtected) {
    args.push('--disableProtected');
  }
  if (options.disableInternal) {
    args.push('--disableInternal');
  }
  if (options.disableLifeCycleHooks) {
    args.push('--disableLifeCycleHooks');
  }
  if (options.disableRoutesGraph) {
    args.push('--disableRoutesGraph');
  }
  if (options.disableSearch) {
    args.push('--disableSearch');
  }
  if (options.disableDependencies) {
    args.push('--disableDependencies');
  }

  return args;
}

function getRelativePath(
  workspacePath: string,
  {
    workspaceRoot,
    projectRoot,
    workspaceDocs,
  }: { workspaceRoot: string; projectRoot: string } & Pick<
    CompodocBuilderSchema,
    'workspaceDocs'
  >,
) {
  const absolutePath = resolve(workspaceRoot, workspacePath);
  return relative(workspaceDocs ? workspaceRoot : projectRoot, absolutePath);
}

function buildCompodocArgs(
  options: CompodocBuilderSchema,
  context: BuilderContext & { projectRoot: string },
): string[] {
  const {
    workspaceRoot,
    projectRoot,
    target: { project },
  } = context;

  const args: string[] = [];

  const tsConfigPath = resolve(workspaceRoot, options.tsConfig);
  const outputPath = resolve(workspaceRoot, options.outputPath);
  args.push(
    `--tsconfig=${tsConfigPath}`,
    `--output=${outputPath}`,
    `--exportFormat=${options.exportFormat}`,
  );
  if (options.exportFormat === 'json') {
    args.push('--minimal');
  }

  if (options.name) {
    args.push(`--name=${options.name}`);
  } else if (options.workspaceDocs) {
    const workspaceName = readJsonFile('package.json').name;
    args.push(`--name=${workspaceName}`);
  } else {
    args.push(`--name=${project}`);
  }

  if (options.workspaceDocs) {
    const includesPath = createIncludesFolderForWorkspace(options, context);
    args.push(`--includes=${includesPath}`);
    args.push(`--includesName=${options.includesName ?? 'Projects'}`);
  } else {
    if (options.includes) {
      const includesPath = getRelativePath(options.includes, {
        workspaceRoot,
        projectRoot,
        workspaceDocs: options.workspaceDocs,
      });
      args.push(`--includes=${includesPath}`);
    }
    if (options.includesName) {
      args.push(`--includesName=${options.includesName}`);
    }
  }

  args.push(...buildDisableArgs(options, context));

  args.push(`--language=${options.language}`);
  args.push(`--theme=${options.theme}`);
  if (options.hideGenerator) {
    args.push('--hideGenerator');
  }
  if (options.customLogo) {
    const customLogoPath = getRelativePath(options.customLogo, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--customLogo=${customLogoPath}`);
  }
  if (options.customFavicon) {
    const customFaviconPath = getRelativePath(options.customFavicon, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--customFavicon=${customFaviconPath}`);
  }
  if (options.extTheme) {
    const extThemePath = getRelativePath(options.extTheme, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--extTheme=${extThemePath}`);
  }
  if (options.templates) {
    const templatesPath = getRelativePath(options.templates, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--templates=${templatesPath}`);
  }
  // TODO: maybe use `<projectRoot>/src/assets` as default
  if (options.assetsFolder) {
    const assetsFolderPath = getRelativePath(options.assetsFolder, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--assetsFolder=${assetsFolderPath}`);
  }

  if (options.unitTestCoverage) {
    const coveragePath = getRelativePath(options.unitTestCoverage, {
      workspaceRoot,
      projectRoot,
      workspaceDocs: options.workspaceDocs,
    });
    args.push(`--unitTestCoverage=${coveragePath}`);
  }

  if (options.serve) {
    args.push('--serve', `--port=${options.port}`);
  }

  if (options.watch) {
    args.push('--watch');
  }

  if (options.silent) {
    args.push('--silent');
  }

  return args;
}

function createEmptyCompodocJson(
  options: CompodocBuilderSchema,
  { workspaceRoot }: BuilderContext,
) {
  mkdirSync(resolve(workspaceRoot, options.outputPath), {
    recursive: true,
  });
  writeFileSync(
    resolve(workspaceRoot, join(options.outputPath, 'documentation.json')),
    JSON.stringify({
      pipes: [],
      interfaces: [],
      injectables: [],
      classes: [],
      directives: [],
      components: [],
      modules: [],
      miscellaneous: {
        variables: [],
        functions: [],
        typealiases: [],
        enumerations: [],
        groupedVariables: {},
        groupedFunctions: {},
        groupedEnumerations: {},
        groupedTypeAliases: {},
      },
    }),
  );
}

export function spawnCompodocProcess(
  options: CompodocBuilderSchema,
  context: BuilderContext & { projectRoot: string },
): ChildProcess {
  const processOptions = {
    cwd: options.workspaceDocs ? context.workspaceRoot : context.projectRoot,
    shell: true,
  };

  const compodocCmd = buildCompodocCmd(options, context);
  const compodocArgs = buildCompodocArgs(options, context);

  if (options.watch && options.exportFormat === 'json') {
    createEmptyCompodocJson(options, context);

    const nodemonCmd = buildNodemonCmd(options, context);
    const nodemonArgs = [
      '--ignore dist',
      '--ext ts',
      `--exec "${compodocCmd} ${compodocArgs.join(' ')}"`,
    ];
    return spawn(nodemonCmd, nodemonArgs, processOptions);
  }

  return spawn(compodocCmd, compodocArgs, processOptions);
}
