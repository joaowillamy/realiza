import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { backendEnvs } from '@realiza/shared/utils';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.join(__dirname, './templates'),
    adapter: new HandlebarsAdapter({}),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, './templates'),
    },
  },
  defaults: {
    from: `"No Reply" <${backendEnvs.mailUser}>`,
  },
  transport: {
    service: 'gmail',
    host: ' smtp.gmail.com',
    port: 465,
    ignoreTLS: false,
    secure: true,
    auth: {
      user: backendEnvs.mailUser,
      pass: backendEnvs.mailPass,
    },
  },
};
