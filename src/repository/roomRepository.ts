import {pool} from "../database/database";
import {RowDataPacket} from "mysql2";
import{RoomReserved} from "../model/roomModel";

async function createRoom(nome: string, numero: number, camaSolteiro: number, camaCasal: number, disponivel: boolean, preco: number, user_id: number) {
    const sql = `INSERT INTO quartos(nome, numero, camaSolteiro, camaCasal, disponivel, preco, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const [result] = await pool.query(sql, [nome, numero, camaSolteiro, camaCasal, disponivel, preco, user_id])
    return result;
}

async function disponiveis(pedido:RoomReserved):Promise<Quartos|null> {
    const sql = `SELECT * FROM quartos q WHERE q.disponivel = true
            AND ((q.camaCasal * 2) + q.camaSolteiro) >= ?
            AND q.id NOT IN (
                SELECT r.id_quarto_fk
                FROM reservas r 
                WHERE (r.dataFim >= ? AND r.dataInicio <= ?)
            )`;
    const [quartos] = await pool.query<Quartos[]>(sql, [
        pedido.quantidade,
        pedido.dataInicio, 
        pedido.dataFim
    ]);
    return quartos.length > 0 ? quartos : null;

}

async function getFotos(id_quarto: number){
    
}

export default {
    createRoom
}
