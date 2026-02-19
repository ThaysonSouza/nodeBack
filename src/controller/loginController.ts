import { NextFunction, Request, Response } from "express";
import loginRepository from "../repository/loginRepository";
import { validarSenha } from "../utils/senha";
import { createJWT } from "../utils/jwt";

async function login(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }
    if (email.trim() === "" || senha.trim() === "") {
        return res.status(401).json({ message: "Email e senha não pode ser vazio" });
    }
    try {
        const result = await loginRepository.validarLogin(email);
        if(!result) {throw new Error("Login incorreto");}

        
        const resultSenha = await validarSenha(senha, result.senha);
        if(!resultSenha) {throw new Error("Senha incorreta");}

        //remover senha do objeto
        const { senha: _, ...usuario } = result;

        //criar o token do usuario
        const token = createJWT({ usuario });
        
        return res.status(200).json({ token });
        

    } catch (error) {
        console.log(error);
        return res.status(402).json({ message: "Login ou senha incorretos." });
    }
};


export default { login };