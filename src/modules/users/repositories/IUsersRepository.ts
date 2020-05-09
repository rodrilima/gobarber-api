import User from '../infra/typeorm/entities/User'
import ICreateUserService from '../services/ICreateUserService';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserService): Promise<User>;
  save(user: User): Promise<User>;
}
