import express from "express";
import { authRouter } from "./routes/authRoutes.js";

const app = express();


const port = 3000;

app.use(express.json());


app.use('/api/auth', authRouter);

app.get('/', (req , res) => {
    res.send('auth system api');
});


app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});

