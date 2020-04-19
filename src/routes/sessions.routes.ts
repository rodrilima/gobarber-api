import { Router } from 'express';
import { getRepository } from 'typeorm';

import AuthenticateUserService from '../services/AuthenticateUserService';
import User from '../models/User';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService()
    const { user } = await authenticateUserService.execute({ email, password })
    return response.json(user);
  } catch ({ message }) {
    response.status(400).json({ error: message })
  }
})

export default sessionsRouter;
