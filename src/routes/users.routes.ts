import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User'

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.find();
  return response.json(user);
})

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  } catch({ message }) {
    return response.status(406).json({ error: message })
  }
})

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userRepository = getRepository(User);
  await userRepository.delete(id)
  response.status(204).send()
})

export default usersRouter;
