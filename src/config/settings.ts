import * as dotenv from 'dotenv';

dotenv.config(); // Load the .env file


export class Settings {
    static SECRET_KEY: string = process.env.SECRET_KEY;
    static DATABASE_NAME: string = process.env.DATABASE_NAME;
    static DATABASE_HOST: string = process.env.DATABASE_HOST;
    static DATABASE_PORT: string = process.env.DATABASE_PORT;
    static DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD;
    static DATABASE_USER: string = process.env.DATABASE_USER;
}
