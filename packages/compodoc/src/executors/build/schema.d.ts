export interface BuildExecutorSchema
  extends Omit<CompodocOptions, 'tsconfig' | 'output' | 'minimal'> {
  tsConfig?: CompodocOptions['tsconfig']; // todo: migrate to lowercase `tsconfig`
  outputPath?: CompodocOptions['output']; // todo: eval migration to `output`

  /** @default false */
  workspaceDocs: boolean;
  /** @default false */
  debug: boolean;
}

export interface CompodocOptions {
  /** @default <projectRoot>/tsconfig.json */
  tsconfig: string;
  /** @default dist/compodoc/<projectName> */
  output: string;

  exportFormat: CompodocFormat;
  /** @default exportFormat === 'json' */
  minimal: boolean;

  /** @default project/workspace name */
  name?: string;

  /** @default project readmes (workspace docs only) */
  includes?: string;
  includesName?: string;

  assetsFolder?: string;
  unitTestCoverage?: string;

  /** @default true */
  disableCoverage: boolean;
  /** @default false */
  disableSourceCode: boolean;
  /** @default false */
  disableDomTree: boolean;
  /** @default false */
  disableTemplateTab: boolean;
  /** @default false */
  disableStyleTab: boolean;
  /** @default false */
  disableGraph: boolean;
  /** @default true */
  disablePrivate: boolean;
  /** @default false */
  disableProtected: boolean;
  /** @default true */
  disableInternal: boolean;
  /** @default true */
  disableLifeCycleHooks: boolean;
  /** @default false */
  disableRoutesGraph: boolean;
  /** @default false */
  disableSearch: boolean;
  /** @default false */
  disableDependencies: boolean;

  /** @default 'en-US' */
  language: CompodocLanguage;
  /** @default 'gitbook' */
  theme: CompodocTheme;
  extTheme?: string;
  templates?: string;
  customLogo?: string;
  customFavicon?: string;
  /** @default false */
  hideGenerator: boolean;

  /** @default watch */
  serve: boolean;
  /** @default 8080 */
  port: number;
  /** @default false */
  watch: boolean;
  /** @default !serve && !watch */
  silent: boolean;
}

type CompodocFormat = 'html' | 'json';

type CompodocLanguage =
  | 'en-US'
  | 'de-DE'
  | 'es-ES'
  | 'fr-FR'
  | 'hu-HU'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-BR'
  | 'sk-SK'
  | 'zh-CN';

type CompodocTheme =
  | 'gitbook'
  | 'laravel'
  | 'original'
  | 'material'
  | 'postmark'
  | 'readthedocs'
  | 'stripe'
  | 'vagrant';
