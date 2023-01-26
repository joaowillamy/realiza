import {
  Controller, Post, UseGuards, Get, ValidationPipe, Body
} from '@nestjs/common';
import { CreateUserDto, CredentialsDto, ReturnUserDto, User, UserRole, UserService } from '@realiza/api/user';
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
    console.log({credentiaslsDto});

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
}
