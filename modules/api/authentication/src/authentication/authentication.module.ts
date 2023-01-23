import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModule } from '@realiza/api/user'

import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
