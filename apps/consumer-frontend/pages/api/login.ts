import { frontendEnvs } from '@realiza/shared/utils';
import * as cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const login = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('tokenHttpOnly', req.body.token, {
      httpOnly: true,
      path: '/',
      secure: frontendEnvs.isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 5,
    })
  );

  res.status(200).json({ success: true });
};

export default login;
