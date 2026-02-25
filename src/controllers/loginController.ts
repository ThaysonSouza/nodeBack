import {Request, Response, NextFunction} from "express"
import loginRepository from "../repositories/loginRepository";
import {validarSenha, gerarSenha} from "../utils/senha";
import {createJWT} from "../utils/jwt"

async function loginCliente(req:Request, res:Response, next:NextFunction) {
    const {email, senha} = req.body;
    
    if (!email || !senha){
        return res.status(400).json({erro:"Email e senha são obrigatorios"})
    }

    if (email.trim() === "" || senha.trim() === ""){
        return res.status(400).json({erro:"Email e senha estão vazios"})
    }

    // consulta no banco de dados
    try {
        const result = await loginRepository.validarLogin(email);
        if (!result){throw new Error("Login incorrerto")}

        // validar senha do login
        const resultSenha = await validarSenha(senha, result.senha)
        if ( !resultSenha ) { throw new Error("Senha invalida")}
        
        // remover senha do objeto
        const {senha:_senha, ...usuario} = result
        
        // criar o token do usuario
        const token = createJWT(usuario)
        return res.status(200).json(token);
        
    } catch (error) {
        return res.status(400).json({erro: "Credenciais invalidas!"})
    }
    
}

async function cadastroCliente(req:Request, res:Response, next:NextFunction) {
    const {nome, email, senha, cpf, telefone} = req.body;

    if (!nome || !email || !senha || !cpf || !telefone){
        return res.status(400).json({erro:"Todos os campos são obrigatorios !!"})
    }
    if (nome.trim()==="" || email.trim()==="" || senha.trim()==="" || cpf.trim()==="" || telefone.trim()===""){
        return res.status(400).json({erro:"Os campos não podem ser vazios!!"})
    }
    
    try {
        const senhaHash = await gerarSenha(senha);
        const dadosLogin = {nome, email, senha:senhaHash, cpf, telefone}
        const result = await loginRepository.cadastrarLogin(dadosLogin)
        if (!result){throw new Error("Erro na criação do login")}

        // remover senha do objeto
        const {senha:_senha, cpf:_cpf, telefone:_tel, ...usuario} = result
        
        // criar o token do usuario
        const token = createJWT(usuario)
        return res.status(200).json(token);

    } catch (error) {
        console.log("Erro", error)
        return res.status(400).json({erro:"Erro ao criar Login"})
    }
}


export default{
    loginCliente, cadastroCliente
}
