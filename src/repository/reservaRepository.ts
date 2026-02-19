import { pool } from "../database/database";
import { ResultSetHeader } from "mysql2";


async function fazerPedido(data: any){
    const sql = `INSERT INTO pedidos(id_cliente_fk, pagamento)VALUES ( ?, ?)`;
    try{
        const [result] = await pool.query<ResultSetHeader>(sql,[
            data.cliente_id,
            data.pagamento
        ]);
        return result.insertId;
    }catch(error){
        console.error("Erro ao criar pedido:", error);
        return null;
    }
}

async function fazerReserva(pedidoID: number, quarto:any) {
    const sql = `INSERT INTO reservas(id_pedido_fk, id_quarto_fk, data_inicio, data_fim) VALUES (?, ?, ?, ?)`;
     try{
        const [result] = await pool.query<ResultSetHeader>(sql,[
            pedidoID,
            quarto.id,
            quarto.dataInicio,
            quarto.dataFim
        ]);
        return result.insertId;
    }catch(error){
        console.error("Erro ao criar pedido:", error);
        return null;
    }
 
}

export default {
    fazerPedido, fazerReserva
}