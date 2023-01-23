import {
  Controller, Post, UseGuards, Request, Get
} from '@nestjs/common';
import { UserService } from '@realiza/api/user';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
      return this.userService.findOne(req.user)
  }

  // TODO verify token
  // TODO refresh token
}
