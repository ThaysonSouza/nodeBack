import { Router } from "express";
import loginController from "../controllers/loginController";
import { middleware } from "./jwtMiddleware";
import rotaLogin from "./loginRouter";
import rotaQuartos from "./quartosRouter";
import rotaReservas from "./reservaRouter";

export const handlerRouter = Router();

// rotas publica

handlerRouter.use("/api/login", rotaLogin);
handlerRouter.use("/api/quartosDisponiveis", rotaQuartos);

// rotas privadas
handlerRouter.use("/api/perfil/senha", middleware, loginController.alterarSenha);
handlerRouter.use("/api/perfil", middleware, loginController.getPerfil);
handlerRouter.use("/api/reserva", middleware, rotaReservas);

