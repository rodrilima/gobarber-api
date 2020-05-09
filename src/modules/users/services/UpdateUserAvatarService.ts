import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ){}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if(!user) throw new AppError('Only autheticated users can be update avatar.', 401)

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user)

    return user;
  }
}

export default UpdateUserAvatarService
