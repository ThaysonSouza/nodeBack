import { Request, Response, NextFunction } from "express";
import roomRepository from "../repository/roomRepository";
import { Room } from "../model/roomModel";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nome, numero, camaSolteiro, camaCasal, disponivel, preco }: Omit<Room, 'user_id'> = req.body;
        const user_id = (req as any).payload.id;

        if (!nome || !numero || camaSolteiro === undefined || camaCasal === undefined || disponivel === undefined || preco === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const result = await roomRepository.createRoom(nome, numero, camaSolteiro, camaCasal, disponivel, preco, user_id);
        res.status(201).json({ message: "Quarto criado com sucesso.", data: result });
    } catch (error) {
        next(error);
    }
};

async function disponiveis(req: Request, res: Response, next: NextFunction) {
    const { dataInicio, dataFim, quantidade } = req.body;
    if (!dataInicio || !dataFim || !quantidade) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const dados = {
        dataInicio,
        dataFim,
        quantidade
    }
    try{ 
        let rooms = await roomRepository.disponiveis(dados);
        if(!rooms){ throw new Error("erro ao buscar quartos") }
    
    for (let q of rooms) {
        const fotos = await roomRepository.getFotos(q.id);
        q.fotos = fotos;res.json(rooms);
    }
    }catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Erro ao buscar quartos." });
    }
}
export default {
    createRoom,
    disponiveis
}
