import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
const PORT = process.env.PORT || 4000;
import dotenv from "dotenv";
import inhanceImageroutes from "./routes/inhanceImageRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
await connectDB();
// import imageRoutes from './routes/imageRoutes.js';

const _dirname = path.resolve();

app.use("/api/imageinhance", inhanceImageroutes);
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.get("/", (req, res) => res.send("API working"));
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => console.log("Server running on port" + PORT));
