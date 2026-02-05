import { Request, Response, NextFunction } from "express";
import { validateLogin } from "../repository/loginRepository";
import{validarSenha} from "../utils/senha";

async function login(req:Request, res:Response, next:NextFunction) {
 const { email, senha } = req.body;
 if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
 }
 if (email.trim() === "" || senha.trim() === "") {
    return res.status(401).json({ erro: "Email e senha não podem ser vazios" });
 }
 
 try {
   const result = await validateLogin(email);
   if (!result) {throw new Error()}

   console.log(result.email);
   console.log(result.senha);
   console.log("Resultado: ", await validarSenha(senha, result.senha));
   return res.status(200).json;

 } catch (error) {
   console.log(error);
   return res.status(402).json({ erro: "Credenciais inválidas" });
 }
  
}

export default {
  login
}
