import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { CompodocSchematicSchema } from './schema';

describe('compodoc schematic', () => {
  let appTree: Tree;
  const options: CompodocSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@twittwer/compodoc',
    join(__dirname, '../../../collection.json'),
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('compodoc', options, appTree).toPromise(),
    ).resolves.not.toThrowError();
  });
});
