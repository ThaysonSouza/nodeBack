import { NextFunction, Request, Response } from "express";
import cadastroRepository from "../repository/cadastroRepository";
import { createJWT } from "../utils/jwt";
import { gerarSenha } from "../utils/senha";

async function cadastro(req: Request, res: Response, next: NextFunction) {
    const { email, senha, nome, cpf, telefone } = req.body;

    if (!email || !senha || !nome || !cpf || !telefone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    if (email.trim() === "" || senha.trim() === "") {
        return res.status(400).json({ message: "Email e senha não podem ser vazios." });
    }

    try {
        // ← Aqui está a correção principal
        const senhaHash = await gerarSenha(senha);

        const result = await cadastroRepository.cadastrarCliente(
            nome,
            cpf,
            email,
            senhaHash,
            telefone
        );

        if (!result) {
            throw new Error("Erro ao cadastrar usuário");
        }

        const { senha: _, ...usuario } = result;

        const token = createJWT({ usuario });

        return res.status(201).json({ token });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
}

export default { cadastro };