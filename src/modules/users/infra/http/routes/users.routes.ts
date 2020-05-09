import { Router } from 'express';
import { getRepository } from 'typeorm';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import User from '@modules/users/infra/typeorm/entities/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.find();
  return response.json(user);
})

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = container.resolve(CreateUserService);
  const user = await createUserService.execute({ name, email, password });
  delete user.password;
  return response.json(user);
})

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userRepository = getRepository(User);
  await userRepository.delete(id)
  response.status(204).send()
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })
    delete user.password;
    response.json(user)
})

export default usersRouter;
