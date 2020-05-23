import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateProfileService = container.resolve(UpdateProfileService);
    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });
    delete user.password;
    return response.json(user);
  }
}
