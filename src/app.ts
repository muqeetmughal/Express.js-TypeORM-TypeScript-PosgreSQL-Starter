// app.ts
import express from 'express';


import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes'
import { customMiddleware } from './middlewares/customMiddleware';



const app = express();

app.use(express.json());
app.use(customMiddleware);


const port = process.env.PORT || 3500;

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});



AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => console.log(error))
