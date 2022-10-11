import { DocumentNode } from 'graphql';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import path from 'node:path';

export async function buildTypeDefs(): Promise<DocumentNode> {
  const typesArray = await loadFiles(path.join(__dirname, '../schemas'), {
    extensions: ['graphql'],
  });

  return mergeTypeDefs(typesArray);
}
