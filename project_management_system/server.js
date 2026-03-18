import express from "express";
import { userRouter } from "./routes/userRoutes.js";

const projectApp = express();
const port = 3000;

projectApp.use(express.json());


projectApp.use('/api/user', userRouter);


projectApp.get('/', (req, res) => {
    res.send('project management app');
});

projectApp.listen(port, ()=> {
    console.log(`server is running on http://localhosst:${port}`);
});
