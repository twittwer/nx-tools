import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  joinPathFragments,
  offsetFromRoot,
  ProjectConfiguration,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  Tree,
  updateProjectConfiguration,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';
import { join } from 'path';
import { CompodocGeneratorSchema } from './schema';

type WorkspaceLayout = ReturnType<typeof getWorkspaceLayout>;

export default async function runGenerator(
  tree: Tree,
  options: CompodocGeneratorSchema,
) {
  const _init = init(tree);

  const workspaceLayout = getWorkspaceLayout(tree);
  const projectConfiguration = readProjectConfiguration(tree, options.project);

  const tsconfig = determineTsconfigFile(
    tree,
    options,
    workspaceLayout,
    projectConfiguration,
  );

  projectConfiguration.targets.compodoc = {
    executor: '@twittwer/compodoc:compodoc',
    options: {
      tsConfig: joinPathFragments(projectConfiguration.root, tsconfig),
      outputPath: joinPathFragments('dist', 'compodoc', options.project),
    },
    configurations: { json: { exportFormat: 'json' } },
  };
  if (options.workspaceDocs) {
    projectConfiguration.targets.compodoc.options.workspaceDocs = true;
  }

  updateProjectConfiguration(tree, options.project, projectConfiguration);

  await formatFiles(tree);
  return _init;
}

function init(tree: Tree): GeneratorCallback {
  const install = addDependenciesToPackageJson(
    tree,
    {},
    { '@compodoc/compodoc': '^1.1.19' },
  );

  const workspaceConfiguration = readWorkspaceConfiguration(tree);
  if (workspaceConfiguration.tasksRunnerOptions?.default) {
    workspaceConfiguration.tasksRunnerOptions.default.options =
      workspaceConfiguration.tasksRunnerOptions.default.options || {};
    workspaceConfiguration.tasksRunnerOptions.default.options.cacheableOperations =
      workspaceConfiguration.tasksRunnerOptions.default.options
        .cacheableOperations || [];

    if (
      !workspaceConfiguration.tasksRunnerOptions.default.options.cacheableOperations.includes(
        'compodoc',
      )
    ) {
      workspaceConfiguration.tasksRunnerOptions.default.options.cacheableOperations.push(
        'compodoc',
      );
      updateWorkspaceConfiguration(tree, workspaceConfiguration);
    }
  }

  return install;
}

function determineTsconfigFile(
  tree: Tree,
  options: CompodocGeneratorSchema,
  { appsDir, libsDir }: WorkspaceLayout,
  projectConfiguration: ProjectConfiguration,
): string {
  const tsconfig = [
    'tsconfig.compodoc.json',
    ...{
      application: ['tsconfig.editor.json', 'tsconfig.app.json'],
      library: ['tsconfig.lib.json'],
    }[projectConfiguration.projectType],
    'tsconfig.json',
  ].find((tsconfig) => tree.exists(join(projectConfiguration.root, tsconfig)));
  if (!tsconfig) {
    throw new Error(
      `Missing tsconfig: Cannot find a "tsconfig[.(compodoc|lib|editor|app)].json" file in "${projectConfiguration.root}".`,
    );
  }

  if (options.workspaceDocs && tsconfig !== 'tsconfig.compodoc.json') {
    const includes = [...new Set([appsDir, libsDir])].map(
      (dir) => `${offsetFromRoot(projectConfiguration.root)}${dir}/**/*.ts`,
    );
    generateFiles(tree, join(__dirname, 'files'), projectConfiguration.root, {
      tsconfigBase: `./${tsconfig}`,
      includes: includes,
      tpl: '',
    });
    return 'tsconfig.compodoc.json';
  }

  return tsconfig;
}
