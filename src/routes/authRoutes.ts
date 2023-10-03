import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';

const authRouter: Router = express.Router();

const secretKey = 'your-secret-key';
const refreshTokenSecret = 'your-refresh-secret-key';
const accessTokenExpiration = '1h'; // Adjust as needed
const refreshTokenExpiration = '7d'; // Adjust as needed

authRouter.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                where: { email: email },
            });

            if (!user) {
                return res.status(401).json({ success: false, msg: 'User Not Exist' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, msg: 'Invalid Password' });
            }

            // Generate an access token
            const accessToken = jwt.sign(
                { userId: user.id, email: user.email },
                secretKey,
                {
                    expiresIn: accessTokenExpiration,
                }
            );

            // Generate a refresh token
            const refreshToken = jwt.sign(
                { userId: user.id, email: user.email },
                refreshTokenSecret,
                {
                    expiresIn: refreshTokenExpiration,
                }
            );

            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
);

export default authRouter;
