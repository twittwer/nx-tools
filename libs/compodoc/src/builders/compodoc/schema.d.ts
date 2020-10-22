import { JsonObject } from '@angular-devkit/core';

export interface CompodocBuilderSchema extends JsonObject {
  tsConfig?: string;
  outputPath?: string;
  exportFormat: 'html' | 'json';
  workspaceDocs: boolean;

  name?: string;

  includes?: string;
  includesName?: string;

  disableCoverage: boolean;
  disableSourceCode: boolean;
  disableDomTree: boolean;
  disableTemplateTab: boolean;
  disableStyleTab: boolean;
  disableGraph: boolean;
  disablePrivate: boolean;
  disableProtected: boolean;
  disableInternal: boolean;
  disableLifeCycleHooks: boolean;
  disableRoutesGraph: boolean;
  disableSearch: boolean;
  disableDependencies: boolean;

  language:
    | 'en-US'
    | 'es-ES'
    | 'fr-FR'
    | 'hu-HU'
    | 'it-IT'
    | 'ja-JP'
    | 'nl-NL'
    | 'pt-BR'
    | 'zh-CN';
  theme:
    | 'gitbook'
    | 'laravel'
    | 'original'
    | 'material'
    | 'postmark'
    | 'readthedocs'
    | 'stripe'
    | 'vagrant';
  hideGenerator: boolean;
  customLogo?: string;
  customFavicon?: string;
  extTheme?: string;
  templates?: string;
  assetsFolder?: string;

  unitTestCoverage?: string;

  serve: boolean;
  port: number;

  watch: boolean;

  silent: boolean;
}
