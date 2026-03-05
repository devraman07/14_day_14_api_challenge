const express = require("express");
const UserRoutes = require('./routes/UserRoute.js')

const app = express();
const PORT = 3000;


app.use(express.json());

app.use('/api/user',UserRoutes );


app.get("/", (req, res) => {
  res.send("User CRUD API running");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});