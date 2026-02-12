import { Request, Response, NextFunction } from "express";
import roomRepository from "../repository/roomRepository";
import { Room } from "../model/roomModel";

async function getAvaibleRooms(req: Request, res: Response, next: NextFunction) {

    console.log("Requisição recebida para buscar quartos disponíveis:");

    const { inicio, fim, qtdPessoas } = req.body;

    if (!inicio || !fim || !qtdPessoas) {
        return res.status(401).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (inicio.trim() === "" || fim.trim() === "" || qtdPessoas.toString().trim() === "") { 
        return res.status(402).json({ erro: "Campos não podem ser vazios" });
    }

    try {
        const rooms: Room[] = await roomRepository.getAvaibleRooms(inicio, fim, qtdPessoas);

        if (rooms.length === 0) {
            return res.status(403).json({ mensagem: "Nenhum quarto disponível encontrado." });
        }

        const formattedRooms = rooms.map(room => {
            return {
                id: room.id,
                nome: room.nome,
                capacidadeTotal: (room.qtd_cama_casal * 2) + room.qtd_cama_solteiro,
                preco: room.preco
            };
        });

        return res.status(200).json(formattedRooms);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

export default {
  getAvaibleRooms
}
