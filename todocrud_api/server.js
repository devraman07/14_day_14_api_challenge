import express from "express";
import router from "./routes/todoRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/todo", router);

app.get("/", (req, res) => {
  res.send("Todo server running");
});

app.listen(port, () => {
  console.log("server is running on port : http://localhost:3000");
});