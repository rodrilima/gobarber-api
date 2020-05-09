import { uuid } from 'uuidv4';

import IUserTokenRepository from '../IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });
    this.userTokens.push(userToken);
    return userToken
  }
}
