import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, updateJsonInTree } from '@nrwl/workspace';

export function installDependencies({
  dependencies = {},
  devDependencies = {},
}: {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}): Rule {
  return addDepsToPackageJson(dependencies, devDependencies);
}

export function moveToDevDependencies(packageName: string): Rule {
  return updateJsonInTree('package.json', packageJson => {
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.devDependencies = packageJson.devDependencies || {};

    if (packageJson.dependencies[packageName]) {
      packageJson.devDependencies[packageName] =
        packageJson.dependencies[packageName];
      delete packageJson.dependencies[packageName];
    }

    return packageJson;
  });
}
