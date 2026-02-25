import { Router } from "express";

import rotaLogin from "./loginRouter";
import { createJWT } from "../utils/jwt";
import { middleware } from "./jwtMiddleware";

import rotaQuartos from "./quartosRouter";
import rotaReservas from "./reservaRouter";

const handlerRouter = Router();

// rotas publicas

handlerRouter.use("/api/login", rotaLogin);
handlerRouter.use("/api/quartosDisponiveis", rotaQuartos);

// rotas privadas
handlerRouter.use("/api/reserva", middleware, rotaReservas);


handlerRouter.use("/jwt", (req, res)=>{
    const payload = {
        id: 123,
        nome: "fulano",
        cargo: "cliente"
    }
    res.json(createJWT(payload))
})
handlerRouter.get("/testeJWT", middleware, (req, res)=>{
    res.json("passou pelo JWT middleware")
})



export default handlerRouter