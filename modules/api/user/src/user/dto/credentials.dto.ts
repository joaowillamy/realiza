import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty({
    message: 'Inválido',
  })
  @ApiProperty({ example: 'email@gmail.com', description: 'user email' })
  email: string;

  @IsNotEmpty({
    message: 'Inválido',
  })
  @ApiProperty({ example: 'pass', description: 'user password' })
  password: string;
}
