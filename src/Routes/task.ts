import { Router } from "express";
import taskController from "../controller/taskController";

const routeTask = Router();

routeTask.get("/", taskController.getAllTask )
routeTask.get("/:id", taskController.getTask)
routeTask.post("/", taskController.createTask)
routeTask.put("/:id", taskController.updateTask)
routeTask.delete("/:id", taskController.deleteTask)

export default routeTask;
