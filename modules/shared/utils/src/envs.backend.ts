import { envsShare } from './envs.share';

export const backendEnvs = {
  ...envsShare,
  jwtSecret: process.env["NX_JWT_SECRET"],
  pgHost: process.env["NX_PG_HOST"],
  pgPort: Number(process.env["NX_PG_PORT"]),
  pgUsername: process.env["NX_PG_USERNAME"],
  pgPassword: process.env["NX_PG_PASSWORD"],
  pgDatabase: process.env["NX_PG_DATABASE"],
  port: process.env['PORT'],
  mailUser: process.env['MAIL_USER'],
  mailPass: process.env['MAIL_PASS'],
}
