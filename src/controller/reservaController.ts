import {Request, Response, NextFunction} from "express"
import reservaRepository from "../repository/reservaRepository";

async function corrigirDataHora(data:string, hora:number) {
    let novaData = new Date(data);
    novaData.setHours(hora, 0, 0);
    return novaData.toLocaleDateString("en-CA", { timeZone: "UTC" }); // Formato YYYY-MM-DD
    
}

async function criarPedido(req:Request, res:Response, next:NextFunction) {
    const token = req.payload;
    const {pagamento, quarto} = req.body;

    if(!token.id || !pagamento) {
        return res.status(400).json({message: "Dados incompletos para criar pedido"})
    }

    try{
        const dadosPedido = {
            cliente_id : token.id,
            pagamento : pagamento,
        }

        //Criar o pedido
        const pedidoID = await reservaRepository.fazerPedido(dadosPedido);
        if(!pedidoID) {throw new Error("Erro ao criar pedido")}
        
        let result = [];
        //Criar reserva
        for(let q of quarto) {
           q.dataInicio = await corrigirDataHora(q.dataInicio, 14);
           q.dataFim = await corrigirDataHora(q.dataFim, 12);

            const reservaID = await reservaRepository.fazerReserva(pedidoID, quarto);
            if(!reservaID){continue}
            result.push({
                ...q,
                reservaID: reservaID
            })
            console.log(result)
            res.status(200).json({
                message: "Pedido criado com sucesso",
                pedidoID: pedidoID,
                reservas: result
            })
        }

        res.status(200).json({message: "Pedido criado com sucesso"})
    }catch(error){
        console.log(error)

        return res.status(400).json({message: "Erro ao criar pedido"})
    }
    console.log(token.id, token.nome);
    console.log(pagamento)
    console.log(quarto)
    return res.sendStatus(200);
    
}


export default {
    criarPedido
}