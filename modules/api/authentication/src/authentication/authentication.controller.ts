import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ChangePasswordDto,
  CreateUserDto,
  CredentialsDto,
  FindUsersQueryDto,
  ReturnUserDto,
  UpdateUserDto,
  User,
  UserRole,
  UserService,
} from '@realiza/api/user';

import { AuthenticationService } from './authentication.service';
import { GetUser } from './decorator/get-user.decorator';
import { Role } from './decorator/role.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private usersService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<{ message: string }> {
    await this.authenticationService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @ApiTags('Auth')
  @Post('/signin')
  @ApiResponse({ status: 200, description: 'sign' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto
  ): Promise<{ token: string }> {
    return await this.authenticationService.signIn(credentiaslsDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth')
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User): User {
    return user;
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth')
  @Patch('/me/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso'
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth')
  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {
    const user = await this.authenticationService.confirmEmail(token);
    return {
      user,
      message: 'Email confirmado',
    };
  }

  @ApiTags('Auth')
  @Post('/send-recover-email')
  @ApiBody({ schema: { example: { email: 'will@gmail.com' } } })
  async sendRecoverPasswordEmail(
    @Body('email') email: string
  ): Promise<{ message: string }> {
    await this.authenticationService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @ApiTags('Auth')
  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto
  ): Promise<{ message: string }> {
    await this.authenticationService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @ApiTags('Auth')
  @Patch(':id/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: User
  ) {
    if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
      throw new UnauthorizedException(
        'Você não tem permissão para realizar esta operação'
      );

    await this.authenticationService.changePassword(id, changePasswordDto);
    return {
      message: 'Senha alterada',
    };
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth admin')
  @Post('/admin/signup')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth admin')
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

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth admin')
  @Delete('/admin/users/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @ApiBearerAuth('JWT-auth')
  @ApiTags('Auth admin')
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
