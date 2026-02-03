import { Request, Response, NextFunction } from "express";

async function login(req:Request, res:Response, next:NextFunction) {
  try {
    console.log("Recebido login:", req.body);
    return res.status(201).json({message: "Login criado com sucesso"})
  } 
  catch(error) {  
    console.log("Erro ao criar login", error)
    return res.status(400).json({erro:"Dados invalidos"})
  }
}

export default {
  login
}
