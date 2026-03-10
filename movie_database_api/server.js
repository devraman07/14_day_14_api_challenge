import express from 'express';
import { adminRouter } from './routes/adminRoutes.js';
import { movieRouter } from './routes/movieroutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/admin', adminRouter);
app.use('/api/movies', movieRouter);

app.get('/', (req , res) => {
    res.send('movie backend server running smooth');
});


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});