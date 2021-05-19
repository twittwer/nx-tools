import { chain, Rule } from '@angular-devkit/schematics';
import {
  ensureDependencies,
  moveToDevDependencies,
} from './utils/dependency.utils';
import { addCacheableOperation } from './utils/nx.utils';
import { versions } from '../../utils/versions';

const addVersions = (packages: string[]) =>
  packages.reduce((acc, pkg) => ({ ...acc, [pkg]: versions[pkg] }), {});

export default function (): Rule {
  return chain([
    ensureDependencies({
      devDependencies: addVersions([
        '@twittwer/compodoc',
        '@compodoc/compodoc',
      ]),
    }),
    moveToDevDependencies('@twittwer/compodoc'), // is eventually added to the dependencies by the ng-add command
    addCacheableOperation('compodoc'),
  ]);
}
