import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  })

  it('should be able to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    });

    const user = await sendForgotPasswordEmail.execute({
      email: 'name@email.com'
    });

    expect(sendMail).toHaveBeenCalled();
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'name@email.com'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'name@email.com'
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  })
})
