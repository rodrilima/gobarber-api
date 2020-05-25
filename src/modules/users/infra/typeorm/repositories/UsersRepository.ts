import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository, { IFindAllProvidersDTO } from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '../entities/User'

export default class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAllProviders({expept_user_id}: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if(expept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expept_user_id)
        }
      })
    } else {
      users = await this.ormRepository.find()
    }

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ name, email, password })
    await this.ormRepository.save(user)
    return user
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user)
    return user
  }
}
