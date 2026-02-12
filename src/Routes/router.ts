import { Router } from "express";
// import routeLogin from "./login";
import routeRoom from "./room";
import routeTask from "./task";
import { createJWT } from "../utils/jwt";
import { middleware } from "./jwtMiddleware";

const handleRouter = Router();


// handleRouter.use("/api/client/", routeLogin);
handleRouter.use("/api/room", routeRoom);
handleRouter.use("/task", routeTask);
handleRouter.use("/api/QuartosDisponiveis")

handleRouter.use("/jwt", (req, res) => {
    const payload = {id: 123, nome: "teste", cargo: "cliente"}
    res.json(createJWT(payload)) 
})
handleRouter.get("/testeJWT", middleware, (req, res) => {
    res.json("Autorizado")
})   


export default handleRouter; 

