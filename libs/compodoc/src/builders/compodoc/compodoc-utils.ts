import { BuilderContext } from '@angular-devkit/architect';
import { resolve } from 'path';
import { CompodocBuilderSchema } from './schema';

export function buildCompodocCmd({ workspaceRoot }: BuilderContext) {
  return resolve(workspaceRoot, 'node_modules', '.bin', 'compodoc');
}

export function buildCompodocArgs(
  options: CompodocBuilderSchema,
  { workspaceRoot, target: { project } }: BuilderContext,
): string[] {
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
  } else {
    args.push(`--name=${project}`);
  }
  args.push(`--language=${options.language}`);

  args.push(`--theme=${options.theme}`);
  if (options.extTheme) {
    const extThemePath = resolve(workspaceRoot, options.extTheme);
    args.push(`--extTheme=${extThemePath}`);
  }
  if (options.templates) {
    const templatesPath = resolve(workspaceRoot, options.templates);
    args.push(`--templates=${templatesPath}`);
  }

  if (options.customLogo) {
    const customLogoPath = resolve(workspaceRoot, options.customLogo);
    args.push(`--customLogo=${customLogoPath}`);
  }
  if (options.customFavicon) {
    const customFaviconPath = resolve(workspaceRoot, options.customFavicon);
    args.push(`--customFavicon=${customFaviconPath}`);
  }
  if (options.hideGenerator) {
    args.push('--hideGenerator');
  }

  if (options.includes) {
    const includesPath = resolve(workspaceRoot, options.includes);
    args.push(`--includes=${includesPath}`);
  }
  args.push(`--includesName=${options.includesName}`);

  if (options.hideGenerator) {
    args.push('--hideGenerator');
  }
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
