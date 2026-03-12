import express from "express";
import { signupRouter } from "./routes/signupRoute.js";


const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/user', signupRouter);

app.get('/', (req , res) => {
    res.send("file upload api backend");
});


app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
});
