import express from 'express';
import authRouter from './routes/authRoutes.js'


const app = express();
const port = 3000;

app.use(express.json());


app.use('/api/user', authRouter )


app.get('/', (req, res) => {
    res.send('authentication api working');
});

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});