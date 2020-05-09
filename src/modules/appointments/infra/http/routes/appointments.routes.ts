import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentController = new AppointmentController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointment = await appointmentRepository.find()
//   response.json(appointment)
// })


// appointmentsRouter.delete('/:id', async (request, response) => {
//   const id = request.params.id
//   await appointmentRepository.delete(id)
//   return response.status(204).send()
// })

export default appointmentsRouter;
