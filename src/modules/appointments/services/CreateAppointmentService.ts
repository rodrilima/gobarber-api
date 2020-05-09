import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe'

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository
  ){}

  public async execute({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked');
    const appointment = await this.appointmentRepository.create({ provider_id, date: appointmentDate });
    return appointment;
  }
}

export default CreateAppointmentService;
