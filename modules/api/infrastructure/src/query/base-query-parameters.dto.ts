import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseQueryParametersDto {
  @ApiProperty({ description: 'Sort', required: false })
  sort: string | undefined;

  @ApiProperty({ example: 1, description: 'Page', required: false })
  page: number | undefined;

  @ApiProperty({ example: 100, description: 'Limit', required: false })
  limit: number | undefined;
}
