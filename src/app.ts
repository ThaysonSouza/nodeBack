import express from "express";
import { handlerRouter } from "./Routes/router";

const app = express();
app.use(express.json());
app.use(handlerRouter)


export default app;
