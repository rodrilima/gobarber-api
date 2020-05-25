import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index)


// appointmentsRouter.delete('/:id', async (request, response) => {
//   const id = request.params.id
//   await appointmentRepository.delete(id)
//   return response.status(204).send()
// })

export default appointmentsRouter;
