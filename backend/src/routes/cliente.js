import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";

const router = Router();

router.get("/", async (req,res)=>{
    try {
        const db = await connectionDB();
        let cliente = db.collection("clientes");

        let clientes = await cliente.find().toArray();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
})
export default router;