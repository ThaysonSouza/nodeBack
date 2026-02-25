import {pool} from "../database/database"
import { RowDataPacket } from "mysql2";
import { QuartoReserva, Quartos } from "../models/quarto";

async function disponiveis(pedido:QuartoReserva):Promise<Quartos[]|null>{
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
        pedido.dataFim,
    ])
    return quartos.length ? quartos : null
}

async function buscarFotoPorQuartoId(id:number) {
    const sql = `SELECT i.caminho FROM quarto_imagem QF
        JOIN imagens i ON QF.id_imagem_fk = i.id
        WHERE QF.id_quarto_fk = ?`;

    const [fotos] = await pool.query<RowDataPacket[]>(sql, [id])
    return fotos.map(foto=>(foto.nome))
}

export default{
    disponiveis, buscarFotoPorQuartoId
}