import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
const empleado = db.collection("empleados");

router.get("/vendedor", async (req,res)=>{
    const empleados = await empleado.find({Cargo: {$eq: "Vendedor"}}).toArray();
    res.send(empleados);
});

export default router;