import { BuildExecutorSchema, CompodocOptions } from './schema';
import { spawn } from 'child_process';
import { join, relative, resolve, sep } from 'path';
import {
  ExecutorContext,
  getPackageManagerCommand,
  readJsonFile,
} from '@nrwl/devkit';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext,
) {
  options.debug && console.log('Prepare Compodoc...\n', options);

  const project = context.workspace.projects[context.projectName];

  const args = toCompodocOptions(options, context);

  const cmd = `${getPackageManagerCommand().exec} compodoc`;
  const cmdArgs = toArguments(toCompodocOptions(options, context));
  const cmdOpts = {
    cwd: options.workspaceDocs ? context.root : project.root,
    shell: true,
  };

  if (options.watch && options.exportFormat === 'json') {
    createInitialCompodocJson(args);
  }

  return new Promise<{ success: boolean }>((resolve) => {
    options.debug &&
      console.log('Spawn Compodoc...', {
        command: cmd,
        arguments: cmdArgs,
        options: cmdOpts,
      });

    const childProcess = spawn(cmd, cmdArgs, cmdOpts);

    process.on('exit', () => childProcess.kill());
    process.on('SIGTERM', () => childProcess.kill());

    childProcess.stdout.on('data', (data) => {
      console.info(data.toString());
    });
    childProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    childProcess.on('close', (code) => {
      resolve({ success: code === 0 });
    });
  });
}

function toCompodocOptions(
  options: BuildExecutorSchema,
  context: ExecutorContext,
): CompodocOptions {
  const _: [BuildExecutorSchema, ExecutorContext] = [options, context];
  const project = context.workspace.projects[context.projectName];

  return {
    tsconfig: options.tsConfig
      ? resolve(context.root, options.tsConfig)
      : resolve(project.root, 'tsconfig.json'),
    output: options.outputPath
      ? resolve(context.root, options.outputPath)
      : resolve('dist', 'compodoc', context.projectName),

    exportFormat: options.exportFormat,
    minimal: options.exportFormat === 'json',

    name:
      options.name ||
      (options.workspaceDocs
        ? readJsonFile('package.json').name
        : context.projectName),

    includes: options.workspaceDocs
      ? createIncludesForWorkspace(..._)
      : toRelativePath(options.includes, ..._),
    includesName:
      options.includesName || (options.workspaceDocs ? 'Projects' : undefined),

    assetsFolder: toRelativePath(options.assetsFolder, ..._),
    unitTestCoverage: toRelativePath(options.unitTestCoverage, ..._),

    disableCoverage: options.disableCoverage,
    disableSourceCode: options.disableSourceCode,
    disableDomTree: options.disableDomTree,
    disableTemplateTab: options.disableTemplateTab,
    disableStyleTab: options.disableStyleTab,
    disableGraph: options.disableGraph,
    disablePrivate: options.disablePrivate,
    disableProtected: options.disableProtected,
    disableInternal: options.disableInternal,
    disableLifeCycleHooks: options.disableLifeCycleHooks,
    disableRoutesGraph: options.disableRoutesGraph,
    disableSearch: options.disableSearch,
    disableDependencies: options.disableDependencies,

    language: options.language,
    theme: options.theme,
    extTheme: toRelativePath(options.extTheme, ..._),
    templates: toRelativePath(options.templates, ..._),
    customLogo: toRelativePath(options.customLogo, ..._),
    customFavicon: toRelativePath(options.customFavicon, ..._),
    hideGenerator: options.hideGenerator,

    serve: options.serve ?? options.watch,
    port: options.serve ? options.port : undefined,
    watch: options.watch,
    silent: options.silent ?? (!options.serve && !options.watch),
  };
}

function createIncludesForWorkspace(
  options: BuildExecutorSchema,
  context: ExecutorContext,
): string {
  const tmpDirectory = mkdtempSync(join(tmpdir(), 'compodoc-includes-'));
  writeFileSync(
    join(tmpDirectory, 'summary.json'),
    JSON.stringify(
      Object.entries(context.workspace.projects)
        .map(([projectName, project]) => {
          const readmeFile = join(project.root, 'README.md');
          return { projectName, readmeFile };
        })
        .filter(({ readmeFile }) => existsSync(readmeFile))
        .map(({ projectName, readmeFile }) => {
          const tmpFilename = `${projectName}.md`;
          copyFileSync(readmeFile, join(tmpDirectory, tmpFilename));
          return { title: projectName, file: tmpFilename };
        }),
    ),
  );
  return relative(context.root, tmpDirectory);
}

function toRelativePath(
  pathInWorkspace: string | undefined,
  options: BuildExecutorSchema,
  context: ExecutorContext,
): string | undefined {
  if (!pathInWorkspace) {
    return undefined;
  }
  const project = context.workspace.projects[context.projectName];
  const currentDirectory = options.workspaceDocs ? context.root : project.root;
  const absolutePath = resolve(context.root, pathInWorkspace);
  return relative(currentDirectory, absolutePath);
}

function toArguments(options: CompodocOptions): string[] {
  return Object.entries(options)
    .filter(([, value]) => !!value)
    .reduce((args, [key, value]) => {
      let arg = `--${key}`;
      if (typeof value !== 'boolean') {
        arg += `="${value}"`;
      }
      return [...args, arg];
    }, []);
}

function createInitialCompodocJson(args: Pick<CompodocOptions, 'output'>) {
  mkdirSync(args.output, { recursive: true });
  writeFileSync(
    join(args.output, 'documentation.json'),
    JSON.stringify({
      pipes: [],
      interfaces: [],
      injectables: [],
      guards: [],
      interceptors: [],
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
