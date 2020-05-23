import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'New Full Name',
      email: 'new@email.com'
    })

    expect(updatedUser).toMatchObject({
      name: 'New Full Name',
      email: 'new@email.com'
    })
  })


  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: '123',
        name: 'teste',
        email: 'teste@teste.com.br'
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    await fakeUsersRepository.create({
      name: 'Other Name',
      email: 'other@email.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'New Full Name',
      email: 'other@email.com'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'New Full Name',
      email: 'new@email.com',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser).toMatchObject({
      name: 'New Full Name',
      email: 'new@email.com',
      password: '123123'
    })
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'New Full Name',
      email: 'new@email.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update the password with worng old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Full Name',
      email: 'name@email.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'New Full Name',
      email: 'new@email.com',
      old_password: 'abacaxi',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  })
})
