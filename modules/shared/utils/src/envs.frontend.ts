import { envsShare } from './envs.share';

export const frontendEnvs = {
  ...envsShare,
  apiBaseUrl: process.env['NX_API_BASE_URL']
}
