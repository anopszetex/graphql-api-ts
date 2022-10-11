import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from '@graphql-tools/utils/typings';

import path from 'node:path';

export async function buildResolvers(): Promise<IResolvers> {
  const resolversArray = await loadFiles(
    path.join(__dirname, '../resolvers/**/index.ts')
  );

  return mergeResolvers(resolversArray);
}
