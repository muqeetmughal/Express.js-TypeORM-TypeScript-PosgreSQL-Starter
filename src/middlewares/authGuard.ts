import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../types/definitions';
import { User } from '../entity/User';

const secretKey = 'your-secret-key';

export const authGuard = (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
) => {
    // Get the token from the request header or query parameter
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, secretKey, async (err, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        // Find the user based on the user ID from the decoded token
        try {
            const user = await User.findOne({ where: { id: decoded.userId } });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};
