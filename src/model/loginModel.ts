import { RowDataPacket } from "mysql2";

export type Usuario = RowDataPacket & {
    id: number;
    email: string;
    senha: string;
    cargo: string;
    nome: string;
}
