import { JsonObject } from '@angular-devkit/core';

export interface CompodocBuilderSchema extends JsonObject {
  tsConfig?: string;
  outputPath?: string;
  exportFormat: 'html' | 'json';

  name?: string;
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
  extTheme?: string;
  templates?: string;

  customLogo?: string;
  customFavicon?: string;
  hideGenerator: boolean;

  includes?: string;
  includesName: string;

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

  assetsFolder?: string;

  serve: boolean;
  port: number;

  silent: boolean;
}
