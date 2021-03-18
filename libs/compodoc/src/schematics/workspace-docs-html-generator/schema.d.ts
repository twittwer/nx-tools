import { CompodocBuilderSchema } from '@twittwer/compodoc';

export interface WorkspaceCompodocStaticHtmlGeneratorSchema
  extends CompodocBuilderSchema {
  atRootOfOutputPath: boolean;
  projects: string;
  all: boolean;
}
