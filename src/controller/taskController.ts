import { Request, Response, NextFunction } from "express";
import taskRepository from "../repository/taskRepository";
import Task from "../model/taskModel";

async function getAllTask(req:Request, res:Response, next:NextFunction) {
  const result = await taskRepository.getAllTasks()
  res.json(result);
}

async function getTask(req:Request, res:Response, next:NextFunction) {
  const {id} = req.params
  let result = await taskRepository.getTask(parseInt(id))
  const status = result ? 200 : 404
  result = result ? result : ['Tarefa não localizada'] //Erro
  res.status(status).json(result)
}

async function createTask(req:Request, res:Response, next:NextFunction) {
  const taks = req.body as Task
  try {
    const result = await taskRepository.createTask(taks)
    return res.status(201).json(result)
  } 
  catch(error) {
    console.log("Erro ao criar tarefa", error)
    return res.status(400).json({erro:"Dados invalidos"})
  }
}

async function updateTask(req:Request, res:Response, next:NextFunction) {
  const {id} = req.params
  const task = req.body as Task
  try {
    const result = await taskRepository.updateTask(parseInt(id), task) 
    return res.status(201).json(result)
  }
  catch (error) {
    console.log("Erro ao atualizar tarefa", error)
    return res.status(400).json({erro:"Dados invalidos"})
  }
}

async function deleteTask(req:Request, res:Response, next:NextFunction) {
  const {id} = req.params
  try {
    const result = await taskRepository.deleteTask(parseInt(id))
    return res.status(200).json(result)
  }
  catch (error) {
    console.log("Erro ao deletar tarefa", error)
    return res.status(400).json({erro:"Dados invalidos"})
  }
}

export default {
  getAllTask, getTask, createTask, updateTask, deleteTask
}
