import { isEmpty } from 'lodash';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { authKey } from './../../infra/config';
import { ContextParams } from './../../domains/types';

interface TokenInfo {
  token: string;
}

export async function auth(
  _: undefined,
  args: { email: string; password: string },
  context: ContextParams
): Promise<TokenInfo | Error> {
  const { email, password } = args;

  const user = await context.queryBuilder.postgre.getUser({
    table: 'users',
    input: { email },
  });

  if (isEmpty(user)) {
    return await Promise.reject(new Error('User not found'));
  }

  const isValidPassword = await argon2.verify(user.password, password);

  if (!isValidPassword) {
    return await Promise.reject(new Error('Invalid password'));
  }

  const token = jwt.sign({ id: user.id }, authKey.JWT_KEY, {
    expiresIn: '4h',
  });

  return { token };
}
