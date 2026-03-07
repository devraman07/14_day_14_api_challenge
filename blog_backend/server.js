import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());



app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);


app.get('/', (req, res) => {
    res.send('Blog backend api running smooth');
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});