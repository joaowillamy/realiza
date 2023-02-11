import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '@realiza/api/infrastructure';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiProperty({ example: 'will', description: 'user name', required: false })
  name!: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'user email',
    required: false,
  })
  email!: string;
  status!: boolean;
  role!: string;
}
