import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserService from '@modules/users/services/ICreateUserService'
import User from '../../infra/typeorm/entities/User'
import { uuid } from 'uuidv4';

export default class UserRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)
    return findUser
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)
    return findUser
  }

  async create({ name, email, password }: ICreateUserService): Promise<User> {
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
