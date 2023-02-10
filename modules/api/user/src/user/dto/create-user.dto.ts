import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  email: string;

  name: string;

  password: string;

  passwordConfirmation: string;
}
