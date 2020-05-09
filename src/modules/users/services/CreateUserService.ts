import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider:IHashProvider
  ){}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError('Email already used.')
    }

    const hasedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({ name, email, password: hasedPassword });
    return user;
  }
}

export default CreateUserService;
