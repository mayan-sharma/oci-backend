import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_PORT: process.env.DATABASE_PORT || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    SECRET: process.env.SECRET?.toString() || ''
}

export default config;