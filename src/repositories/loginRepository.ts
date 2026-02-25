import {pool} from "../database/database"
import {Login, dadosLogin} from "../models/login"
import { QueryResult, ResultSetHeader} from "mysql2"

async function validarLogin(email:string):Promise<Login|null>{
    const sql = `SELECT clientes.id, clientes.nome, clientes.email, clientes.senha, roles.nome AS cargo
        FROM clientes JOIN roles ON clientes.id_roles_fk = roles.id
        WHERE clientes.email = ? `
    
    const [rows] = await pool.query<Login[]>(sql, [email])
    return rows.length ? rows[0] : null
}

async function cadastrarLogin(dadosLogin:dadosLogin):Promise<Login|null>{
    const sql = `INSERT INTO clientes (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?)`;
 
    const [result] = await pool.query<ResultSetHeader>(sql, [
        dadosLogin.nome,
        dadosLogin.cpf,
        dadosLogin.telefone,
        dadosLogin.email,
        dadosLogin.senha,
    ]);
    if (result.insertId){
        const resultado:Login  = {id:result.insertId, ...dadosLogin, cargo:"cliente"} as Login
        return resultado
    }
    return null;
}


export default{
    validarLogin, cadastrarLogin
}