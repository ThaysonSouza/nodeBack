export default class Task {
  id: number;
  name: string;
  description: string;

  private static nextId = 1;

  constructor(name:string, description:string) {
    this.id = Task.nextId++;
    this.name = name;
    this.description = description;
  }

}
