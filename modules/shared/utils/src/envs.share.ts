export const envsShare = {
  isProduction: process.env["NODE_ENV"] === "production",
  isDevelopment: process.env["NODE_ENV"] === "development",
  frontendUrl: process.env['NX_FRONTEND_URL'],
}
