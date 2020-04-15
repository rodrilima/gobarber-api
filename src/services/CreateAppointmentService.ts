import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw Error('This appointment is already booked');
    const appointment = this.appointmentRepository.create({ provider, date: appointmentDate });
    return appointment;
  }
}

export default CreateAppointmentService;
