// routes/userRoutes.ts

import express from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
const router = express.Router();
// Create a new user

const userRepository = AppDataSource.getRepository(User)

// Create a new user
router.post('', async (req, res) => {
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

    try {
        const newUser = userRepository.create(req.body);
        await userRepository.save(newUser);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error.detail)
        return res.status(500).json({ error: error.detail });
    }
});

// Get all users
router.get('', async (req, res) => {
    const users = await userRepository.find();
    return res.json(users);
});

// // Get user by ID
// router.get('/users/:id', async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const user = await userRepository.findOne(id);

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     return res.json(user);
// });

// // Update user by ID
// router.put('/users/:id', async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const existingUser = await userRepository.findOne(id);

//     if (!existingUser) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     userRepository.merge(existingUser, req.body);

//     try {
//         await userRepository.save(existingUser);
//         return res.json(existingUser);
//     } catch (error) {
//         return res.status(500).json({ error: 'Could not update user' });
//     }
// });

// // Delete user by ID
// router.delete('/users/:id', async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const user = await userRepository.findOne(id);

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     try {
//         await userRepository.remove(user);
//         return res.status(204).send();
//     } catch (error) {
//         return res.status(500).json({ error: 'Could not delete user' });
//     }
// });

export default router;
