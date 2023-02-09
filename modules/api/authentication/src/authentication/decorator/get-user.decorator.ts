import { createParamDecorator } from '@nestjs/common';
import { User } from '@realiza/api/user';

export const GetUser = createParamDecorator((data, req): User => {
  const user = req.args[0].user;
  return user;
});
