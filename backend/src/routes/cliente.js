import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
let cliente = db.collection("clientes");

router.get("/", async (req,res)=>{
    let clientes = await cliente.find().toArray();
    res.send(clientes);
})
export default router;