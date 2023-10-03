// app.ts
import express from 'express';


import { AppDataSource } from './data-source';
import authRouter from './routes/authRoutes';
import usersRouter from './routes/userRoutes';



const app = express();

app.use(express.json());


const port = process.env.PORT || 3500;

app.use('/auth', authRouter);
app.use('/users', usersRouter);


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});



AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    })
}).catch(error => console.log(error))
