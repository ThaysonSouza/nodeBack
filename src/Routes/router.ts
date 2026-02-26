import { Router } from "express";
import rotaLogin from "./loginRouter";
import { middleware } from "./jwtMiddleware";
import rotaQuartos from "./quartosRouter";
import rotaReservas from "./reservaRouter";

export const handlerRouter = Router();

// rotas publica

handlerRouter.use("/api/login", rotaLogin);
handlerRouter.use("/api/quartosDisponiveis", rotaQuartos);

// rotas privadas
handlerRouter.use("/api/reserva", middleware, rotaReservas);

