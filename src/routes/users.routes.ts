import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User'

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User)
  const user = await userRepository.find()
  return response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email, password })
  delete user.password
  return response.json(user)
})

export default usersRouter;
