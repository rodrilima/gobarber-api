import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'name@email.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toMatchObject(user);
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

    await expect(authenticateUser.execute({
      email: 'name@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    await expect(authenticateUser.execute({
      email: 'name@email.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})
