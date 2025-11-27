import express from "express";
import { Request, Response, NextFunction } from "express";
import router from "./Routes/tasksRouter";

const app = express();
app.use(express.json());
app.use("/task", router);

//rota por parametro:
// app.get(
//   "/parametro/:nome",
//   (req: Request, res: Response, next: NextFunction) => {
//     const nome = req.params.nome;
//     console.log("rota de parametro - cliente digitou este nome: ", nome);
//     res.send(`voce digitou este nome: ${nome}`);
//   },
// );

// //rota por query(tipo: opcional):
// app.get("/query", (req: Request, res: Response, next: NextFunction) => {
//   const nome = req.query.nome;
//   console.log("cliente digitou este nome: ", nome);
//   res.send(`voce digitou este nome: ${nome}`);
// });

// //rota com parametros no body:
// app.get("/body", (req: Request, res: Response, next: NextFunction) => {
//   const nome = req.body.nome;
//   console.log("Variavel dentro da body - cliente digitou este nome: ", nome);
//   res.send(`voce digitou este nome: ${nome}`);
// });

// app.get("/exemplo", (req: Request, res: Response, next: NextFunction) => {
//   console.log("aconteceu algo!!!!!");
//   res.send("rodou tudo certo");
// });

export default app;
