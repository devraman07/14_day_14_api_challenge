import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { projectRouter } from "./routes/projectroutes.js";
import { taskRouter } from "./routes/tasksRoutes.js";
import { memberRouter } from "./routes/memberRoutes.js";

const projectApp = express();
const port = 3000;

projectApp.use(express.json());


projectApp.use('/api/user', userRouter);
projectApp.use('/api/projects', projectRouter);
projectApp.use('/api/task', taskRouter);
projectApp.use('/api/member', memberRouter);


projectApp.get('/', (req, res) => {
    res.send('project management app');
});

projectApp.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});
