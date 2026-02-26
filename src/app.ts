import express from "express";
import cors from "cors";
import handlerRouter from "./routes/router";

const app = express();
app.use(cors())
app.use(express.json());

app.use(handlerRouter);



export default app;
