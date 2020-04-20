import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import AppError from '../errors/AppError';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment'

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
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked');
    const appointment = appointmentRepository.create({ provider_id, date: appointmentDate });
    await appointmentRepository.save(appointment)
    return appointment;
  }
}

export default CreateAppointmentService;
