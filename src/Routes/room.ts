import { Router } from "express";
import roomController from "../controller/roomController";

const routeRoom = Router();

routeRoom.post("/", roomController.disponiveis);

export default routeRoom;
