import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseQueryParametersDto {
  @ApiProperty({ description: 'Sort' })
  sort: string;

  @ApiProperty({ example: 1, description: 'Page' })
  page: number;

  @ApiProperty({ example: 100, description: 'Limit' })
  limit: number;
}
