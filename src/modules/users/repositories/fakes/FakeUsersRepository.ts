import IUsersRepository, { IFindAllProvidersDTO } from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '../../infra/typeorm/entities/User'
import { uuid } from 'uuidv4';

export default class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({expept_user_id}: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if(expept_user_id) {
      users = this.users.filter(user => user.id !== expept_user_id)
    }

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)
    return findUser
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)
    return findUser
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)
    this.users[findIndex] = user;
    return user;
  }
}
