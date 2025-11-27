import { Router } from "express";
import taskController from "../controller/taskController";

const router = Router();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.atualizarTask);
router.delete("/:id", taskController.deletarTask);

export default router;
