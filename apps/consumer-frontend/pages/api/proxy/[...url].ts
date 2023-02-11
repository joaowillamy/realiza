import { frontendEnvs } from '@realiza/shared/utils';
import axios from 'axios';
import * as https from 'https';
import { NextApiRequest, NextApiResponse } from 'next';
// import * as fs from'fs';
// import * as path from 'path';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  // key: fs.readFileSync(path.join(process.cwd(), 'configs', 'ssl', 'key.pem')),
  // cert: fs.readFileSync(path.join(process.cwd(), 'configs', 'ssl', 'cert.pem')),
});

export const axiosInstance = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  httpsAgent,
});

const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, ...queries } = req.query;

  const formattedUrl = Array.isArray(url) ? url.join('/') : url;
  const authorization = req?.cookies?.tokenHttpOnly ? { Authorization: `Bearer ${req?.cookies?.tokenHttpOnly}` } : {};

  const response = await axiosInstance({
    url: `${frontendEnvs.apiBaseUrl}/${formattedUrl}`,
    headers: {
      ...req.headers,
      ...authorization,
    },
    method: req.method,
    data: req.body || queries,
  });

  // TODO: refrash token here

  res.status(response.status).json({ ...response.data });
};

export default getToken;
