import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv";

config();

const app = express();

app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true
}))
app.use(morgan("dev")); // para visualizar las peticiones
app.use(express.json()); // para transformar los req.body en json (si no, el backend devolvería undefined)
app.use(cookieParser())

app.use("/api", authRoutes); // todas las rutas de authRoutes empezaran con /api
app.use("/api", taskRoutes);

export default app;
