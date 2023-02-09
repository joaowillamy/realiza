import { frontendEnvs } from '@realiza/shared/utils';
import axios from 'axios';
import { configAxiosInstance } from './interceptors';

const instance = axios.create({
  baseURL: `${frontendEnvs.apiBaseUrl}/authentication`,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
})

const proxyInstance = axios.create({
  baseURL: `${frontendEnvs.frontendUrl}/api/proxy`,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
})

const frontInstance = axios.create({
  baseURL: `${frontendEnvs.frontendUrl}/api`,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
})

export const serviceInstance = configAxiosInstance(instance)
export const serviceFrontInstance = configAxiosInstance(frontInstance)
export const serviceProxyInstance = configAxiosInstance(proxyInstance)
