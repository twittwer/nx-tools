import { CompodocBuilderSchema } from '@twittwer/compodoc';

export interface WorkspaceCompodocStaticHtmlGeneratorSchema
  extends CompodocBuilderSchema {
  projects: string;
  all: boolean;
}
