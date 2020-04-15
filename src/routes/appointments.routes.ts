import { Router } from 'express';
import { parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentRepository.all()
  response.json(appointment)
})

appointmentsRouter.post('/', (request, response)=>{
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(appointmentRepository);
    const appointment = createAppointment.execute({ provider, date: parsedDate });
    return response.json(appointment);
  } catch({ message }) {
    return response.status(406).json({ error: message });
  }
});

export default appointmentsRouter;
