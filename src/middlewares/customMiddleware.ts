import { Request, Response, NextFunction } from 'express';

// Define your custom middleware function
export function customMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Your middleware logic here
    console.log('Custom Middleware is running.');

    // Call next() to pass control to the next middleware or route handler
    next();
}
