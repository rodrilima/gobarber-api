import { Router } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointment = await appointmentRepository.find()
//   response.json(appointment)
// })

appointmentsRouter.post('/', async (request, response)=>{
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
  return response.json(appointment);
});

// appointmentsRouter.delete('/:id', async (request, response) => {
//   const id = request.params.id
//   await appointmentRepository.delete(id)
//   return response.status(204).send()
// })

export default appointmentsRouter;
