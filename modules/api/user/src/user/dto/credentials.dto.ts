import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty({
    message: 'Inválido',
  })
  email: string;
  @IsNotEmpty({
    message: 'Inválido',
  })
  password: string;
}
