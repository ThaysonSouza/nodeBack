import { Router } from "express";
import loginController from "../controller/loginController";
import cadastroController from "../controller/cadastroController";

const rotaLogin = Router();

rotaLogin.post("/", loginController.login);
rotaLogin.post("/cadastro", cadastroController.cadastro);

export default rotaLogin;