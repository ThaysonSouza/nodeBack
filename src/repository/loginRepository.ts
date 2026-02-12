import {pool} from "../database/database";
import {Usuario} from "../model/loginModel";

async function login(email:string) {
    const sql = `
        SELECT 
            clientes.id,
            clientes.nome,
            clientes.email,
            clientes.senha,
            roles.nome
        FROM
            clientes
        JOIN 
            roles
        ON 
            clientes.id_roles_fk = roles.id
        WHERE
            clientes.email = ?
    `;

    const [rows] = await pool.query<Usuario[]>(sql, [email])
    return rows.length ? rows[0]  : null
}

async function createClient(nome: string, email: string, senha: string, cpf: string, telefone: string,) {
    const sql = `
        INSERT INTO 
            clientes (nome, email, senha, telefone, cpf) 
        VALUES 
            (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [nome, email, senha, telefone, cpf]);

    return {
        id: (result as any).insertId,
        nome,
        email,
        senha,
        telefone,
        cpf
    };
}

async function updateClient(id:number, data: any) {

    console.log(id)

    const keys = Object.keys(data);
    const camposSql = keys.map(item => `${item} = ?`).join(", ")

    const sql = `
        UPDATE 
            clientes
        SET
            ${camposSql}
        WHERE
            id = ?
    `;

    const [result] = await pool.query(sql, [...keys.map(key => data[key]), id]);
    return result as any;

}

export default {
    login, createClient, updateClient
}
