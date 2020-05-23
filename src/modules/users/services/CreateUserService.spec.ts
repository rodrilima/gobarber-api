import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id');
    expect(user).toMatchObject({
      name: 'Full Name',
      email: 'name@email.com'
    });
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    await expect(createUser.execute({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })
})
