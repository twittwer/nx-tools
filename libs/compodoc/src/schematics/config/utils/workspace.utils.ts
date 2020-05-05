import { ProjectType } from '@nrwl/workspace';
import {
  ProjectDefinition as _ProjectDefinition,
  TargetDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace/definitions';
import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig as _getProjectConfig } from '@nrwl/workspace/src/utils/ast-utils';

export interface ProjectConfig {
  root: string;
  sourceRoot?: string;
  prefix?: string;
  projectType: ProjectType;
  architect: Record<string, TargetDefinition>;
  schematics?: {};
}

export function getProjectConfig(tree: Tree, projectName: string) {
  return _getProjectConfig(tree, projectName) as ProjectConfig;
}

export interface ProjectDefinition
  extends Omit<_ProjectDefinition, 'extensions'> {
  extensions: _ProjectDefinition['extensions'] & { projectType: ProjectType };
}

export function getProjectDefinition(
  workspaceDefinition: WorkspaceDefinition,
  projectName: string,
) {
  if (!workspaceDefinition.projects.has(projectName)) {
    throw new Error(`Cannot find project '${projectName}'`);
  }

  return workspaceDefinition.projects.get(projectName) as ProjectDefinition;
}
