export const envs = {
  jwtSecret: process.env["NX_JWT_SECRET"],
  pgHost: process.env["NX_PG_HOST"],
  pgPort: Number(process.env["NX_PG_PORT"]),
  pgUsername: process.env["NX_PG_USERNAME"],
  pgPassword: process.env["NX_PG_PASSWORD"],
  pgDatabase: process.env["NX_PG_DATABASE"],
  isProduction: process.env["NODE_ENV"] === "production",
  isDevelopment: process.env["NODE_ENV"] === "development"
}
