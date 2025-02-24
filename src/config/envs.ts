import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  SECRET_KEY: string;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
};
