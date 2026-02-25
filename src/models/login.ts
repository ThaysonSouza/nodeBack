import { RowDataPacket } from "mysql2";

export type Login = RowDataPacket &{
    id: number;
    nome:string;
    email:string;
    senha:string;
    cargo:string;
}

export type dadosLogin = {
    nome: string
    cpf: string
    telefone: string
    email: string
    senha: string
}