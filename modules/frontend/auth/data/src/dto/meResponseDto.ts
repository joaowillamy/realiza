import { MeDto } from './meDto';

export type MeResponseDto = {
  message: string | string[];
  me?: MeDto;
  error: boolean;
};
