import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ChangePasswordDto,
  CreateUserDto,
  CredentialsDto,
  User,
  UserRepository,
  UserRole,
} from '@realiza/api/user';
import { backendEnvs } from '@realiza/shared/utils';
import { randomBytes } from 'crypto';
import { Logger } from 'winston';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailerService: MailerService,
    @Inject('winston') private logger: Logger
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const user = await this.userRepository.createUser(
        createUserDto,
        UserRole.USER
      );

      const mail = {
        to: this.getUserEmail(user.email),
        subject: 'Email de confirmação',
        template: 'email-confirmation',
        context: {
          name: this.getUserName(user.name),
          link: `${backendEnvs.frontendUrl}/auth/confirme-email/${user.confirmationToken}`,
        },
      };

      if (!backendEnvs.mailDevBlockSending) {
        await this.mailerService.sendMail(mail);
      }

      return user as User;
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.userRepository.update(
      { confirmationToken },
      { confirmationToken: null }
    );
    if (result.affected === 0) throw new NotFoundException('Token inválido');
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: this.getUserEmail(user.email),
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        name: this.getUserName(user.name),
        link: `${backendEnvs.frontendUrl}/${user.recoverToken}`,
      },
    };

    if (!backendEnvs.mailDevBlockSending) {
      await this.mailerService.sendMail(mail);
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password != passwordConfirmation)
      throw new UnprocessableEntityException('As senhas não conferem');

    await this.userRepository.changePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { recoverToken },
      select: ['id'],
    });

    if (!user) throw new NotFoundException('Token inválido.');

    try {
      await this.changePassword(user.id.toString(), changePasswordDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private getUserName(name: string): string {
    return name?.length ? name.split(' ')[0] : '';
  }

  private getUserEmail(email): string {
    return backendEnvs.isDevelopment ? backendEnvs.mailDevFromMyUser : email;
  }
}
