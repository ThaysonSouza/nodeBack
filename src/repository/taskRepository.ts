import Task from "../model/taskModel"; 

const taskList:Task[] = []

async function getAllTasks() : Promise<Task[] | any> {
    return new Promise((resolve, reject) => {
        return resolve(taskList)
    })
}

async function getTask(id:Number) : Promise<Task|any> {
    return new Promise((resolve, reject) => {
        const task = taskList.find(t => t.id === id)
        return resolve(task)
    })
}

async function createTask(data:Task) : Promise<Task> {
    return new Promise((resolve, reject) => {
        if (!data.name || !data.description){return reject(new Error("Dados invalidos"))}
        const newTask = new Task(data.name, data.description)
        taskList.push(newTask)
        return resolve(newTask)
    })
}

async function updateTask(id:number, data:Task) : Promise<Task> {
    return new Promise((resolve, reject) => {
        const index = taskList.findIndex(t => t.id === id)
        if(index == -1) {return reject(new Error("Tarefa não encontrada"))}
        taskList[index].name = data.name
        taskList[index].description = data.description
        return resolve(taskList[index])
    })
}

async function deleteTask(id:Number) : Promise<Task|any> {
    return new Promise((resolve, reject) => {
        const index = taskList.findIndex(t => t.id === id)
        if (index == -1){return reject(new Error("Tarefa não localizada"))}
        const [task] = taskList.splice(index, 1)
        return resolve(task)
    })    
}

export default {
    getAllTasks, getTask, createTask, updateTask, deleteTask
}
