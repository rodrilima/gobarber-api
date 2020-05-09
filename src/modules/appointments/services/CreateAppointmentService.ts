import { startOfHour } from 'date-fns';
import { isUuid } from 'uuidv4';
import { injectable, inject } from 'tsyringe'

import ICreateAppointmentService from './ICreateAppointmentService';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository
  ){}

  public async execute({ date, provider_id }: ICreateAppointmentService): Promise<Appointment> {
    if(!isUuid(provider_id)) throw Error('This provider_id is not valid')
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked');
    const appointment = await this.appointmentRepository.create({ provider_id, date: appointmentDate });
    return appointment;
  }
}

export default CreateAppointmentService;
