import {
  Controller, Post, UseGuards, Get, ValidationPipe, Body, Param, Patch, ForbiddenException, Delete, Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
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

  @ApiTags('auth')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authenticationService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @ApiTags('auth')
  @Post('/signin')
  @ApiResponse({ status: 200, description: 'sign' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authenticationService.signIn(credentiaslsDto);
  }

  @ApiBearerAuth('JWT-auth') // This is the one that needs to match the name in main.ts
  @ApiTags('auth')
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User): User {
    return user;
  }

  @ApiBearerAuth()
  @ApiTags('auth')
  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {
    const user = await this.authenticationService.confirmEmail(token);
    return {
      user,
      message: 'Email confirmado',
    };
  }

  @ApiBearerAuth()
  @ApiTags('auth admin')
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

  @ApiBearerAuth()
  @ApiTags('auth admin')
  @Get('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @ApiBearerAuth()
  @ApiTags('auth admin')
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

  @ApiBearerAuth()
  @ApiTags('auth admin')
  @Delete('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @ApiBearerAuth()
  @ApiTags('auth admin')
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
