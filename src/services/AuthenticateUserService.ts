import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{user: User}> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Incorrect informations.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error('Incorrect informations.');
    }

    return { user };

  }
}

export default AuthenticateUserService;
