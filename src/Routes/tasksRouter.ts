import { Router } from "express";
import taskController from "../controller/taskController";
import loginController from "../controller/loginController";

const rotaLogin = Router();

// router.get("/", taskController.getTasks);
// router.get("/:id", taskController.getTask);
// router.post("/", taskController.createTask);
// router.put("/:id", taskController.atualizarTask);
// router.delete("/:id", taskController.deletarTask);

rotaLogin.post("/", ()=>{
    console.log('login ok')
});

export default rotaLogin;