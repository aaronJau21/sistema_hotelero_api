import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  SECRET_KEY: string;
  DATABASE_URL: string;
  ALLOWED_FRONT: string;
}

const envVarsSchema = joi
  .object({
    DATABASE_URL: joi.string().required(),
    PORT: joi.number().default(3000),
    SECRET_KEY: joi.string().required(),
    ALLOWED_FRONT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  dburl: envVars.DATABASE_URL,
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
  allowedFront: envVars.ALLOWED_FRONT,
};
