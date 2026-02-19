import { Router } from "express";
import reservaController from "../controller/reservaController";

const reservaRouter = Router();

reservaRouter.post("/", reservaController.criarPedido);

export default reservaRouter;
