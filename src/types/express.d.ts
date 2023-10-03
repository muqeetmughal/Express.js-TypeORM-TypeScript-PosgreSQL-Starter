import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: any; // Replace 'any' with the actual type you want to use for the user data
    }
}


