import { Router } from "express";
import reservaController from "../controllers/reservaController";

const rotaReservas = Router();

rotaReservas.post("/", reservaController.criarPedido)

export default rotaReservas;
