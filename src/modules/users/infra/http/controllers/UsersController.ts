import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const userRepository = getRepository(User);
    const user = await userRepository.find();
    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const userRepository = getRepository(User);
    await userRepository.delete(id)
    return response.status(204).send()
  }
}
