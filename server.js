const express = require("express");
const logger = require("./middleware/logger");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

dotenv.config();

console.log("Mongo db URI :::", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World Server.");
// });

// app.get("/name", (req, res) => {
//   res.send("Harini");
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo DB Connected Sucessfully!");
  })
  .catch((error) => {
    console.log("Mongo DB Error :", error);
  });

app.listen(PORT, () => {
  console.log("Server is runnin g on :", PORT);
});
