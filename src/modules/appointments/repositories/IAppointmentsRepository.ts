import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentService from '../services/ICreateAppointmentService'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentService): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
