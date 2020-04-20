import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    if(!isUuid(provider_id)) throw Error('This provider_id is not valid')
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw Error('This appointment is already booked');
    const appointment = appointmentRepository.create({ provider_id, date: appointmentDate });
    await appointmentRepository.save(appointment)
    return appointment;
  }
}

export default CreateAppointmentService;
