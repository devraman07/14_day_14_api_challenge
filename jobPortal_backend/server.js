import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import {jobRouter }  from  "./routes/jobsRoutes.js"
import { applicationRouter } from './routes/applicationRoute.js';

const port = 4000;

const app = express();
app.use(express.json());



app.use('/api/users', userRouter);
app.use('/api/jobs',jobRouter );
app.use('/api/application', applicationRouter);


app.get('/', (req , res) => {
    res.send('job portal backend running smooth as hell man');
});

app.listen(port , ()=> {
    console.log(`server is running on http://localhost:${port}`);
});