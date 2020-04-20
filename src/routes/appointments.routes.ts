import { Router } from 'express';
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const appointment = await appointmentRepository.find()
  response.json(appointment)
})

appointmentsRouter.post('/', async (request, response)=>{
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
  return response.json(appointment);
});

appointmentsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  await appointmentRepository.delete(id)
  return response.status(204).send()
})

export default appointmentsRouter;
