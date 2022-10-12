import { isEmpty } from 'lodash';
import { ContextParams, UserSchemaGraphql } from './../../domains/types';
import { parseUser } from './../../domains/user';

//* get user by email using mongoose
export async function user(
  _: undefined,
  args: { email: string },
  context: ContextParams
): Promise<UserSchemaGraphql | null> {
  const user = await context.queryBuilder.mongodb.getUser({
    input: { email: args.email },
  });

  if (isEmpty(user)) {
    return null;
  }

  return parseUser(user);
}
