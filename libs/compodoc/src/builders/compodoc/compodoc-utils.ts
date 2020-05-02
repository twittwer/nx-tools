import { BuilderContext } from '@angular-devkit/architect';
import { join, relative, resolve, sep } from 'path';
import { CompodocBuilderSchema } from './schema';
import { readJsonFile, readWorkspaceJson } from '@nrwl/workspace';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { tmpdir } from 'os';
import { copyFileSync, existsSync, mkdtempSync, writeFileSync } from 'fs';

export function buildCompodocCmd(
  options: CompodocBuilderSchema,
  context: BuilderContext,
) {
  const { workspaceRoot } = context;
  return resolve(workspaceRoot, 'node_modules', '.bin', 'compodoc');
}

function buildIncludesFolderForWorkspace(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string {
  const { workspaceRoot } = context;
  const { projects } = readWorkspaceJson() as WorkspaceSchema;

  const tmpFolder = mkdtempSync(`${tmpdir()}${sep}`);

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

export function buildCompodocArgs(
  options: CompodocBuilderSchema,
  context: BuilderContext,
): string[] {
  const {
    workspaceRoot,
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
    const includesPath = buildIncludesFolderForWorkspace(options, context);
    args.push(`--includes=${includesPath}`);
    args.push(`--includesName=${options.includesName ?? 'Projects'}`);
  } else {
    if (options.includes) {
      const includesPath = resolve(workspaceRoot, options.includes);
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
    const customLogoPath = resolve(workspaceRoot, options.customLogo);
    args.push(`--customLogo=${customLogoPath}`);
  }
  if (options.customFavicon) {
    const customFaviconPath = resolve(workspaceRoot, options.customFavicon);
    args.push(`--customFavicon=${customFaviconPath}`);
  }
  if (options.extTheme) {
    const extThemePath = resolve(workspaceRoot, options.extTheme);
    args.push(`--extTheme=${extThemePath}`);
  }
  if (options.templates) {
    const templatesPath = resolve(workspaceRoot, options.templates);
    args.push(`--templates=${templatesPath}`);
  }
  // TODO: maybe use `<projectRoot>/src/assets` as default
  if (options.assetsFolder) {
    const assetsFolderPath = resolve(workspaceRoot, options.assetsFolder);
    args.push(`--assetsFolder=${assetsFolderPath}`);
  }

  if (options.serve) {
    args.push('--serve', `--port=${options.port}`);
  }

  if (options.silent) {
    args.push('--silent');
  }

  return args;
}
