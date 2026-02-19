import { QueryResult, RowDataPacket } from "mysql2";

export type Quartos = RowDataPacket & {
    id: number,
    nome: string,
    numero: number,
    qtd_cama_casal: number,
    qtd_cama_solteiro: number,
    preco: number,
    disponive: number,

}

export type QuartoReserva = {
    dataInicio: string,
    dataFim: string,
    quantidade: string,
    
}