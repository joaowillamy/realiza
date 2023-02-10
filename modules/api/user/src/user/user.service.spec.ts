import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserRole } from './user-roles.enum';
import { UserRepository } from './users.repository';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  findUsers: jest.fn(),
  update: jest.fn(),
});

describe('UserService', () => {
  let userRepository: UserRepository;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    service = await module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    let mockCreateUserDto: CreateUserDto;

    beforeEach(() => {
      mockCreateUserDto = {
        email: 'mock@email.com',
        name: 'Mock User',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword',
      };
    });

    it('should create an user if passwords match', async () => {
      (userRepository.createUser as jest.Mock).mockResolvedValue('mockUser');
      const result = await service.createAdminUser(mockCreateUserDto);

      expect(userRepository.createUser).toHaveBeenCalledWith(mockCreateUserDto, UserRole.ADMIN);
      expect(result).toEqual('mockUser');
    });

    it('should throw an error if passwords doesnt match', async () => {
      mockCreateUserDto.passwordConfirmation = 'wrongPassword';
      expect(service.createAdminUser(mockCreateUserDto)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('findUserById', () => {
    it('should return the found user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue('mockUser');
      expect(userRepository.findOne).not.toHaveBeenCalled();

      const result = await service.findUserById('mockId');
      const select = ['email', 'name', 'role', 'id'];
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'mockId' },
        select,
      });
      expect(result).toEqual('mockUser');
    });

    it('should throw an error as user is not found', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(service.findUserById('mockId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should return affected > 0 if user is deleted', async () => {
      (userRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await service.deleteUser('mockId');
      expect(userRepository.delete).toHaveBeenCalledWith({ id: 'mockId' });
    });

    it('should throw an error if no user is deleted', async () => {
      (userRepository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      expect(service.deleteUser('mockId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUsers', () => {
    it('should call the findUsers method of the userRepository', async () => {
      (userRepository.findUsers as jest.Mock).mockResolvedValue('resultOfsearch');
      const mockFindUsersQueryDto: FindUsersQueryDto = {
        name: '',
        email: '',
        limit: 1,
        page: 1,
        role: '',
        sort: '',
        status: true,
      };
      const result = await service.findUsers(mockFindUsersQueryDto);
      expect(userRepository.findUsers).toHaveBeenCalledWith(mockFindUsersQueryDto);
      expect(result).toEqual('resultOfsearch');
    });
  });

  describe('updateUser', () => {
    it('should return affected > 0 if user data is updated and return the new user', async () => {
      const userResult = { save: jest.fn() };
      (userRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });
      (userRepository.findOne as jest.Mock).mockResolvedValue(userResult);

      const result = await service.updateUser({} as UpdateUserDto, 'mockId');

      expect(result).toEqual(userResult);
    });

    it('should throw an error if no row is affected in the DB', async () => {
      (userRepository.update as jest.Mock).mockResolvedValue({ affected: 0 });

      expect(service.updateUser({} as UpdateUserDto, 'mockId')).rejects.toThrow(NotFoundException);
    });
  });
});
