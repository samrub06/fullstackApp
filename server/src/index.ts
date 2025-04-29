import cors from 'cors';
import express from 'express';
import { connectDB } from './config/database';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);



app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 