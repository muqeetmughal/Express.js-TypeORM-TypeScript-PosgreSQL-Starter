import bcrypt from 'bcrypt';
// routes/userRoutes.ts

import express, { Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { authGuard } from '../middlewares/authGuard';
import { IGetUserAuthInfoRequest } from '../types/definitions';


const usersRouter = express.Router();
// Create a new user

usersRouter.use(authGuard)
// Get all users
usersRouter.get('', async (req: IGetUserAuthInfoRequest, res: Response) => {
    const users = await User.find();
    return res.json(users);
});


// Create a new user
usersRouter.post('', async (req: Request, res: Response) => {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.password = req.body.password;
    user.is_active = req.body.is_active;
    user.is_superuser = req.body.is_superuser;

    // Validate the user entity using class-validator
    const errors = await validate(user);

    if (errors.length > 0) {
        // If validation fails, return validation errors
        return res.status(400).json(errors);
    }
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        user.password = hashedPassword;

        await user.save()
        return res.status(201).json(user);
    } catch (error) {
        console.log(error.detail)
        return res.status(500).json({ error: error.detail });
    }
});


// Get user by ID
usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findOne({
        where: { id: id }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
});

// // Update user by ID
usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const existingUser = await User.findOne({
        where: { id: id }
    });
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }


    existingUser.name = req.body.name || existingUser.name;
    existingUser.email = req.body.email || existingUser.email;
    existingUser.phone_number = req.body.phone_number || existingUser.phone_number;
    existingUser.is_active = req.body.is_active || existingUser.is_active;
    existingUser.is_superuser = req.body.is_superuser || existingUser.is_superuser;


    try {
        await existingUser.save();
        return res.json(existingUser);
    } catch (error) {
        return res.status(500).json({ error: 'Could not update user' });
    }
});

// // Delete user by ID
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findOne({
        where: { id: id }
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        await user.remove();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Could not delete user' });
    }
});

export default usersRouter;
