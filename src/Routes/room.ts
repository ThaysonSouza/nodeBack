import { Router } from "express";
import roomController from "../controller/roomController";

const routeRoom = Router();

console.log("Rota de quartos configurada.");

routeRoom.post("/", roomController.getAvaibleRooms)

export default routeRoom;
