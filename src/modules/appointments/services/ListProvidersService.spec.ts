// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(
      fakeUsersRepository
    )
  })

  it('should be able to list the providers', async () => {
    await fakeUsersRepository.create({
      name: 'Full Name One',
      email: 'name@email.com',
      password: '123456'
    })

    await fakeUsersRepository.create({
      name: 'Full Name Duo',
      email: 'name@email.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Full Name Tre',
      email: 'name@email.com',
      password: '123456'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Full Name One',
          email: 'name@email.com'
        }),
        expect.objectContaining({
          name: 'Full Name Duo',
          email: 'name@email.com'
        })
      ])
    )
  })
})
