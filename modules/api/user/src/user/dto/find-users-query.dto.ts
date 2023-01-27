import { BaseQueryParametersDto } from "@realiza/api/infrastructure";

export class FindUsersQueryDto extends BaseQueryParametersDto {
  name: string;
  email: string;
  status: boolean;
  role: string;
}
