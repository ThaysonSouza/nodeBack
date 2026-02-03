import { Router } from "express";
import router from "./tasksRouter";
import loginController from "../controller/loginController";
import { createJWT } from "../utils/jwt";
import { middleware } from "./jwtMiddleware";
import rotaLogin from "./tasksRouter";

const handlerRouter = Router();

// rotas publicas
handlerRouter.use("/tarefas", router);

handlerRouter.post("/api/login", rotaLogin);

// handlerRouter.use("/jwt", (req, res)=>{
//     const payload = {
//         id: 123,
//         nome: "fulano",
//         cargo: "cliente"
//     }
//     res.json(createJWT(payload))
// })

// // rotas privadas
// handlerRouter.get("/testeJWT", middleware, (req, res)=>{
//     res.json("passou pelo JWT middleware")
// })

export default handlerRouter