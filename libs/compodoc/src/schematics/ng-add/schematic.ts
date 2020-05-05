import { chain, Rule } from '@angular-devkit/schematics';
import {
  installDependencies,
  moveToDevDependencies,
} from './utils/dependency.utils';
import { addCacheableOperation } from './utils/nx.utils';

// TODO: Evaluate the best option for plugin dependency on compodoc
//  - defined a wildcard version (`*`)
//  - defined a fix version (`1.1.11`)
//  - define it as direct plugin dependency (list as dependency in plugin's `package.json` and remove it here)

export default function(): Rule {
  return chain([
    installDependencies({
      devDependencies: {
        '@twittwer/compodoc': '*',
        '@compodoc/compodoc': '*',
      },
    }),
    moveToDevDependencies('@twittwer/compodoc'), // is eventually added to the dependencies by the ng-add command
    addCacheableOperation('compodoc'),
  ]);
}
