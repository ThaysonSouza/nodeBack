import { pool } from '../database/database';
import { cadastro } from "../model/cadastroModel.js";

async function cadastrarCliente(
    nome: string,
    cpf: string,
    email: string,
    senhaHash: string,
    telefone: string
) {
    const sql = "INSERT INTO clientes(nome, email, cpf, telefone, senha)VALUES (?, ?, ?, ?, ?)";
    
    const [result] = await pool.query(sql, [nome, cpf, email, senhaHash, telefone]);

    if (result && 'insertId' in result && result.insertId) {
        const [rows] = await pool.query<cadastro[]>(
            "SELECT nome, cpf, telefone, email FROM clientes WHERE id = ?",
            [result.insertId]
        );
        return rows.length ? rows[0] : null;
    }

    return null;
}

export default { cadastrarCliente };