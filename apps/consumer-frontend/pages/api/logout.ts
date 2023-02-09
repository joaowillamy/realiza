import { frontendEnvs } from "@realiza/shared/utils";
import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

 const logout = (req: NextApiRequest, res: NextApiResponse) => {

  res.setHeader("Set-Cookie", cookie.serialize('tokenHttpOnly', "", {
    httpOnly: true,
    path: "/",
    secure: frontendEnvs.isProduction,
    sameSite: 'strict',
    expires: new Date(0)
  }));

  res.status(200).json({success: true })
}

export default logout;


