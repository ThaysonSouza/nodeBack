import {Request, Response, NextFunction} from "express"
import reservaRespository from "../repositories/reservaRespository";
import {corrigirDataHora} from "../utils/datahora";


async function criarPedido(req:Request, res:Response, next:NextFunction) {
    const token = (req as any).payload ;
    const {pagamento, quartos} = req.body;

    if (!token.id || !pagamento || !quartos){
        return res.status(400).json({erro: "Dados incompletos!"})
    }

    try {
        const dadosPedido = {
            cliente_id : token.id,
            pagamento : pagamento
        }
        // criar o Pedido
        const pedidoID = await reservaRespository.fazerPedido(dadosPedido);
        if (!pedidoID){throw new Error("Erro ao criar o Pedido")}
        
        //criar a reserva para cada um dos quartos
        let result = []
        for (let q of quartos){
            q.dataInicio = await corrigirDataHora(q.dataInicio, 14)
            q.dataFim = await corrigirDataHora(q.dataFim, 12)
            const reservaID = await reservaRespository.fazerReserva(pedidoID, q)
            if (!reservaID){continue}
            result.push({
                ...q,
                reservaID: reservaID,
            })
        }

        res.status(200).json({
            message:"Reserva feita com sucesso",
            pedidoID: pedidoID,
            reservas: result
        })


    } catch (error) {
        console.error(error)
        return res.status(400).json({erro: "Reserva não efetuada!"})
    }

}


export default{
    criarPedido
}