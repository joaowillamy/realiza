import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  email: string;

  password: string;
}
