import { Router } from 'express';
const routes = Router();

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)

export default routes
