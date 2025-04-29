import cors from 'cors';
import express from 'express';
import path from 'path';
import { connectDB } from './config/database';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/users', userRoutes);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 