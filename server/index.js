import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./config/index.js";
import http from "http";
import userRouter from "./routes/user-routes.js";
import authRouter from "./routes/auth-routes.js";
import tweetRouter from "./routes/tweet-routes.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cors({ origin: "*" }));
config.connectToDatabase();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/tweets", tweetRouter);

app.listen(8000, () => {
  console.log("Server is listning on Post 8000");
});
