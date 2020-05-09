import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserService from '@modules/users/services/ICreateUserService'
import User from '../entities/User'

export default class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  async create({ name, email, password }: ICreateUserService): Promise<User> {
    const user = await this.ormRepository.create({ name, email, password })
    await this.ormRepository.save(user)
    return user
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user)
    return user
  }
}
