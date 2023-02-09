import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from '@realiza/api/infrastructure';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModule, UserRepository } from '@realiza/api/user';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 5 },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
