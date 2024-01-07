import {
  ExecutorContext,
  getPackageManagerCommand,
  joinPathFragments,
  readJsonFile,
} from '@nx/devkit';
import { ChildProcess, spawn } from 'child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join, relative, resolve } from 'path';
import { BuildExecutorSchema, CompodocOptions } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext,
) {
  const debug = (...args: any[]) => options.debug && console.log(...args);

  debug('Prepare Compodoc...\n', options);

  const project = context.workspace.projects[context.projectName];

  const args = toCompodocOptions(options, context);

  const cwd = options.workspaceDocs
    ? context.root
    : joinPathFragments(context.root, project.root);

  const cmd = relative(
    cwd,
    joinPathFragments(context.root, 'node_modules', '.bin', 'compodoc'),
  );
  const cmdArgs = toArguments(args);
  const cmdOpts = { cwd, shell: true };

  if (options.watch && options.exportFormat === 'json') {
    createInitialCompodocJson(args);
  }

  return new Promise<{ success: boolean }>((resolve) => {
    let childProcess: ChildProcess;

    if (options.watch && options.workspaceDocs) {
      const _cmd = `${getPackageManagerCommand().exec} nodemon`;
      const _cmdArgs = [
        '--ignore dist',
        '--ext ts',
        `--exec "${cmd} ${cmdArgs
          .filter((arg) => !arg.startsWith('--watch'))
          .join(' ')}"`,
      ];

      debug('Spawn Compodoc in nodemon...', {
        command: _cmd,
        arguments: _cmdArgs,
        options: cmdOpts,
      });

      childProcess = spawn(_cmd, _cmdArgs, cmdOpts);
    } else {
      debug('Spawn Compodoc...', {
        command: cmd,
        arguments: cmdArgs,
        options: cmdOpts,
      });

      childProcess = spawn(cmd, cmdArgs, cmdOpts);
    }

    process.on('exit', () => childProcess.kill());
    process.on('SIGTERM', () => childProcess.kill());

    childProcess.stdout.on('data', (data) => {
      console.log(data.toString());
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

  options.tsConfig ??= `${project.root}/tsconfig.json`;
  options.outputPath ??= `dist/compodoc/${context.projectName}`;

  return {
    tsconfig: toRelativePath(options.tsConfig, ..._),
    output: toRelativePath(options.outputPath, ..._),

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

    disableCoverage: options.disableCoverage,
    coverageTest: options.disableCoverage ? 0 : options.coverageTest,
    coverageTestThresholdFail: options.coverageTestThresholdFail,
    coverageMinimumPerFile: options.coverageMinimumPerFile,

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
  const currentDirectory = options.workspaceDocs
    ? context.root
    : joinPathFragments(context.root, project.root);
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
