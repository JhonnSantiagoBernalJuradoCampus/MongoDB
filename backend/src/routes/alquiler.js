import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
let alquiler = db.collection("alquileres");

router.get("/", async (req,res)=>{
    let alquileres = await alquiler.find().toArray()
    res.send(alquileres);
})

export default router;