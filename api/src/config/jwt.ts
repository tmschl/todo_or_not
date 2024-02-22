import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
    secret: process.env.JWT_SECRET,
}

export default registerAs('jwt', () => config)