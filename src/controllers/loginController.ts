import { NextFunction, Request, Response } from "express";
import loginRepository from "../repositories/loginRepository";
import { createJWT } from "../utils/jwt";
import { gerarSenha, validarSenha } from "../utils/senha";

async function loginCliente(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatorios" })
    }

    if (email.trim() === "" || senha.trim() === "") {
        return res.status(400).json({ erro: "Email e senha estão vazios" })
    }

    // consulta no banco de dados
    try {
        const result = await loginRepository.validarLogin(email);
        if (!result) { throw new Error("Login incorrerto") }

        // validar senha do login
        const resultSenha = await validarSenha(senha, result.senha)
        if (!resultSenha) { throw new Error("Senha invalida") }

        // remover senha do objeto
        const { senha: _senha, ...usuario } = result

        // criar o token do usuario
        const token = createJWT(usuario)
        return res.status(200).json(token);

    } catch (error) {
        return res.status(400).json({ erro: "Credenciais invalidas!" })
    }

}

async function cadastroCliente(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha, cpf, telefone } = req.body;

    if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ erro: "Todos os campos são obrigatorios !!" })
    }
    if (nome.trim() === "" || email.trim() === "" || senha.trim() === "" || cpf.trim() === "" || telefone.trim() === "") {
        return res.status(400).json({ erro: "Os campos não podem ser vazios!!" })
    }

    try {
        const senhaHash = await gerarSenha(senha);
        const dadosLogin = { nome, email, senha: senhaHash, cpf, telefone }
        const result = await loginRepository.cadastrarLogin(dadosLogin)
        if (!result) { throw new Error("Erro na criação do login") }

        // remover senha do objeto
        const { senha: _senha, cpf: _cpf, telefone: _tel, ...usuario } = result

        // criar o token do usuario
        const token = createJWT(usuario)
        return res.status(200).json(token);

    } catch (error) {
        console.log("Erro", error)
        return res.status(400).json({ erro: "Erro ao criar Login" })
    }
}


async function getPerfil(req: Request, res: Response, next: NextFunction) {
    const payload = (req as any).payload;
    if (!payload || !payload.id) {
        return res.status(401).json({ erro: "Não autorizado" });
    }

    try {
        const usuario = await loginRepository.buscarPorId(payload.id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(200).json(usuario);
    } catch (error: any) {
        console.error("ERRO GET_PERFIL:", error);
        return res.status(500).json({ erro: `Erro ao buscar perfil: ${error.message}` });
    }
}

async function alterarSenha(req: Request, res: Response, next: NextFunction) {
    const payload = (req as any).payload;
    const { senhaAtual, novaSenha } = req.body;

    if (!payload || !payload.id) {
        return res.status(401).json({ erro: "Não autorizado" });
    }

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    try {
        const senhaHashAtual = await loginRepository.buscarSenhaPorId(payload.id);
        if (!senhaHashAtual) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        const senhaValida = await validarSenha(senhaAtual, senhaHashAtual);
        if (!senhaValida) {
            return res.status(400).json({ erro: "Senha atual incorreta" });
        }

        const novaSenhaHash = await gerarSenha(novaSenha);
        const sucesso = await loginRepository.atualizarSenha(payload.id, novaSenhaHash);

        if (sucesso) {
            return res.status(200).json({ mensagem: "Senha alterada com sucesso" });
        } else {
            return res.status(500).json({ erro: "Erro ao atualizar senha" });
        }
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno ao alterar senha" });
    }
}

async function atualizarPerfil(req: Request, res: Response, next: NextFunction) {
    const payload = (req as any).payload;
    const { nome, email, telefone } = req.body;

    if (!payload || !payload.id) {
        return res.status(401).json({ erro: "Não autorizado" });
    }

    if (!nome || !email || !telefone) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    try {
        const sucesso = await loginRepository.atualizarPerfil(payload.id, nome, email, telefone);
        if (sucesso) {
            return res.status(200).json({ mensagem: "Perfil atualizado com sucesso" });
        } else {
            return res.status(500).json({ erro: "Erro ao atualizar perfil" });
        }
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno ao atualizar perfil" });
    }
}

export default {
    loginCliente, cadastroCliente, getPerfil, alterarSenha, atualizarPerfil
}
