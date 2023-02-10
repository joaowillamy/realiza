import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../user-roles.enum';
export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  @ApiProperty({ example: 'will', description: 'user name' })
  name!: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    }
  )
  @ApiProperty({ example: 'email@gmail.com', description: 'user email' })
  email!: string;

  @IsOptional()
  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  role!: UserRole;

  @IsOptional()
  @ApiProperty({ example: true, description: 'user status' })
  status!: boolean;
}
