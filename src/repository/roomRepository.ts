import {pool} from "../database/database";
import {Room} from "../models/roomModel";

async function getAvaibleRooms(inicio: string, fim: string, qtdPessoas: number) {
    const sql = `
        SELECT
            q.id,
            q.nome,
            q.qtd_cama_casal,
            q.qtd_cama_solteiro,
            q.preco,
            q.disponivel
        FROM
            quartos q
        WHERE
            q.id NOT IN (
                SELECT
                r.fk_quartos
                FROM
                reservas r
                WHERE
                (r.inicio < ? AND r.fim > ?)
            )
        AND 
            q.disponivel = true
        AND 
            ( (q.qtd_cama_casal * 2) + q.qtd_cama_solteiro ) >= ?;
    `;

    const [rows] = await pool.query<Room[]>(sql, [fim, inicio, qtdPessoas])
    return rows;
}

export default {
    getAvaibleRooms
}
