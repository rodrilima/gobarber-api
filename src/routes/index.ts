import { Router } from 'express';
const routes = Router();

import appointmentsRouter from './appointments.routes'

routes.use('/appointments', appointmentsRouter)

export default routes
