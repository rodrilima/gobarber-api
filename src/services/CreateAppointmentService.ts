import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { getCustomRepository } from 'typeorm';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw Error('This appointment is already booked');
    const appointment = appointmentRepository.create({ provider, date: appointmentDate });
    await appointmentRepository.save(appointment)
    return appointment;
  }
}

export default CreateAppointmentService;
