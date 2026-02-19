import { Router } from "express";
import quartosController from "../controller/quartosController";

const rotaConsultar = Router();

rotaConsultar.post("/", quartosController.disponiveis);

export default rotaConsultar;