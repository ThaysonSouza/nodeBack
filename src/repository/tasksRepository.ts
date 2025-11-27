import Task from "../model/task";

const tarefas: Task[] = [];

async function getTasks(): Promise<Task[] | any> {
  return new Promise((resolve, reject) => {
    return resolve(tarefas);
  });
}

async function getTask(id: number): Promise<Task[] | any> {
  return new Promise((resolve, reject) => {
    const tarefa = tarefas.find((t) => t.id === id);
    return resolve(tarefa);
  });
}

async function createTask(dados: Task): Promise<Task> {
  return new Promise((resolve, reject) => {
    if (!dados.nome || !dados.descricao) {
      return reject(new Error("Estao faltando dados"));
    }
    const newTask = new Task(dados.nome, dados.descricao);
    tarefas.push(newTask);
    return resolve(newTask);
  });
}
async function atualizarTask(id: number, dados: Task): Promise<Task> {
  return new Promise((resolve, reject) => {
    const indice = tarefas.findIndex((t) => t.id === id);
    if (indice === -1) {
      return reject(new Error("Tarefa não encontrada"));
    };
    tarefas[indice].nome = dados.nome;
    tarefas[indice].descricao = dados.descricao;
    return resolve(tarefas[indice]);
  });
}
async function deletarTask(id: number): Promise<Task> {
  return new Promise((resolve, reject) => {
    const indice = tarefas.findIndex((t) => t.id === id);
    if (indice === -1) {
      return reject(new Error("Tarefa não existe"));
    };
    const [task] = tarefas.splice(indice, 1);
    return resolve(task);
  });
}

export default {
  getTasks,
  getTask,
  createTask,
  atualizarTask,
  deletarTask,
};
