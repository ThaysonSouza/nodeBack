import {pool} from "../database/database"
import {ResultSetHeader, RowDataPacket } from "mysql2";

async function fazerPedido(data:any){
    const sql = `INSERT INTO pedidos(id_cliente_fk, pagamento)VALUES ( ?, ?)`;
 
    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [
            data.cliente_id,
            data.pagamento
        ]);
        // apenas retorna o ID do novo pedido
        return result.insertId;
    } catch (err) {
        console.error('Erro ao criar pedido:', err);
        return null;
    }
}

async function fazerReserva(idPedido:number, quarto:any) {
    const sql = `INSERT INTO reservas(id_pedido_fk, id_quarto_fk, dataInicio, dataFim) VALUES (?, ?, ?, ?)`

    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [
            idPedido,
            quarto.id,
            quarto.dataInicio,
            quarto.dataFim,
        ]);
        // apenas retorna o ID do novo pedido
        return result.insertId;
    } catch (err) {
        console.error('Erro ao reservar o quarto:', err);
        return null;
    }
    
}

export default{
    fazerPedido, fazerReserva
}