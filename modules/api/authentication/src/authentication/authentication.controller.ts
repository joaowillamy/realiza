import {
  Controller, Post, UseGuards, Get, ValidationPipe, Body, Param, Patch, ForbiddenException, Delete, Query
} from '@nestjs/common';
import { CreateUserDto, CredentialsDto, FindUsersQueryDto, ReturnUserDto, UpdateUserDto, User, UserRole, UserService } from '@realiza/api/user';

import { AuthenticationService } from './authentication.service';
import { GetUser } from './decorator/get-user.decorator';
import { Role } from './decorator/role.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private usersService: UserService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authenticationService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authenticationService.signIn(credentiaslsDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Post('/admin/signup')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @Get('/admin/users/')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }
}
