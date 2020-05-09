import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import ICreateUserService from './ICreateUserService';
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  public async execute({ name, email, password }: ICreateUserService): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError('Email already used.')
    }

    const hasedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({ name, email, password: hasedPassword });
    return user;
  }
}

export default CreateUserService;
