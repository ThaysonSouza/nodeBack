import { Request, Response, NextFunction } from "express";
import tasksRepository from "../repository/tasksRepository";
import Task from "../model/task";

async function getTasks(req: Request, res: Response, next: NextFunction) {
  const result = await tasksRepository.getTasks()
  res.send(result);
}
async function getTask(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params
  const result = await tasksRepository.getTask(parseInt(id));
  const code = result ? 200 : 404
  res.status(code).json(result)
}
async function createTask(req: Request, res: Response, next: NextFunction) {
  const task = req.body as Task
  try {
    const result = await tasksRepository.createTask(task) 
    return res.status(200).json(result)
  } catch (error) {
    console.log("Erro ao criar", error);
    return res.status(400).json({erro:"dados incompletos/invalidos!"})
  }  
}
async function atualizarTask(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  const task = req.body as Task;
  try {
    const result = await tasksRepository.atualizarTask(parseInt(id), task)
    return res.status(200).json(result)  
  } catch (error) {
    console.log("erro ao atualizar", error);
    return res.status(400).json({erro:"dados invalidos"});    
  }
}
async function deletarTask(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params;
  try {
    const result = await tasksRepository.deletarTask(parseInt(id))
    return res.status(200).json(result)
    
  } catch (error) {
    console.log("erro ao deletar", error);
    return res.status(400).json({erro:"id invalido"});  
  }
}

export default { getTask, getTasks, createTask, atualizarTask, deletarTask };
