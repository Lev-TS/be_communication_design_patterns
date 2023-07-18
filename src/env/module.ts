import dotenv from 'dotenv';

import { EnvSchema } from './schema';

dotenv.config();

export const env = EnvSchema.parse(process.env);
