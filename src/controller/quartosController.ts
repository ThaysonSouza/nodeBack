import { Request, Response, NextFunction } from "express";  

import quartosRepository from "../repository/quartosRepository"

async function disponiveis(req: Request, res:Response, next:NextFunction){
    const {dataInicio, dataFim, quantidade} = req.body;

    if(!dataInicio || !dataFim || !quantidade){
        return res.status(400).json({erro:"Preencha os campos para consultar"})
    }

    const dados = {dataInicio, dataFim, quantidade}
    try {
        let quartos = await quartosRepository.disponiveis(dados)
        if(!quartos){throw new Error("Erro ao buscar os quartos")}

        for(let q of quartos) {
            const fotos = await quartosRepository.buscarFotoPorQuartoId(q.id);
            q.fotos = fotos
        }
        res.status(200).json(quartos);
    }catch(error){
        console.log(error)
        return res.status(400).json({erro: "Erro ao buscar quartos"})
    }

}

export default {
    disponiveis
}