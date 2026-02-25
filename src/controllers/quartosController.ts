import {Request, Response, NextFunction} from "express"
import quartosRepository from "../repositories/quartosRepository";
import {corrigirDataHora} from "../utils/datahora";

async function disponiveis(req:Request, res:Response, next:NextFunction) {
    let {dataInicio, dataFim, quantidade} = req.body;

    if (!dataInicio || !dataFim || !quantidade){
        return res.status(400).json({erro:"Preencha os campos para consulta"})
    }

    dataInicio = await corrigirDataHora(dataInicio, 14)
    dataFim = await corrigirDataHora(dataFim, 12)
    const dados = {dataInicio, dataFim, quantidade}
    try {
        // buscar quartos diponiveis na data 
        let quartos = await quartosRepository.disponiveis(dados)
        if (!quartos){ throw new Error("Erro ao buscar os quartos")}

        // Buscar as fotos para cada quarto retornado
        for (let q of quartos){
            const fotos = await quartosRepository.buscarFotoPorQuartoId(q.id);
            q.fotos = fotos
        }
        res.status(200).json(quartos);

    } catch (error) {
        console.log(error)
        return res.status(400).json({erro:"Erro ao buscar os quartos"})
    }
    
}


export default{
    disponiveis
}
