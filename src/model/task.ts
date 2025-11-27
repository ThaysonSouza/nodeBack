export default class Task {
  id: number;
  nome: string;
  descricao: string;

  private static proximoID = 1;

  constructor(nome: string, descricao: string) {
    this.id = Task.proximoID++;
    this.nome = nome;
    this.descricao = descricao;
  }
}
