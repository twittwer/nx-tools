import { chain, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';

function installDependencies(): Rule {
  // The plugin itself must not be installed, as it's already added by the ng-add command.
  // (configured by `save` property in `collection.json`)

  const devDeps = {
    // TODO: Evaluate the best option for plugin dependency on compodoc
    //  - defined a wildcard version (`*`)
    //  - defined a fix version (`1.1.11`)
    //  - define it as direct plugin dependency (list as dependency in plugin's `package.json` and remove it here)
    '@compodoc/compodoc': '*',
  };

  return addDepsToPackageJson({}, devDeps, true);
}

export default function(): Rule {
  return chain([
    installDependencies(),
    // TODO: add `compodoc` to `cacheableOperations` in `nx.json`
  ]);
}
