import { Router } from 'express';
import { getRepository } from 'typeorm';

import AuthenticateUserService from '../services/AuthenticateUserService';
import User from '../models/User';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService()
  const { user, token } = await authenticateUserService.execute({ email, password })
  delete user.password
  return response.json({ user, token });
})

export default sessionsRouter;
