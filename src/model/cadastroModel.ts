import { QueryResult, RowDataPacket } from "mysql2";

export type cadastro = RowDataPacket & {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    telefone: string;
}