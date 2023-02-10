import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../user-roles.enum';
export class UpdateUserDto {
  name: string;

  email: string;

  role: UserRole;

  status: boolean;
}
