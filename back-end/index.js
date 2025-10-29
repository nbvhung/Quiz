import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

allRoutes(app);

app.get("/", (req, res) => {
  res.send("Quiz API is running");
});

app.listen(3002, () => {
  console.log("Backend is running on port 3002");
});