import { RowDataPacket } from "mysql2";

export interface createRoom {
    nome: string;
    numero: number;
    camaSolteiro: number;
    camaCasal: number;
    disponivel: boolean;
    preco: number;
}

export type Room = RowDataPacket &{
    id: number;
    nome: string;
    numero: number;
    camaSolteiro: number;
    camaCasal: number;
    disponivel: boolean;
    preco: number;
}

export type RoomReserved = {
    dataInicio: string;
    dataFim: string;
    quantidade: number;
}
