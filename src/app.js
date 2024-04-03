// mantener la configuracion de express
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", taskRouter)

export default app;