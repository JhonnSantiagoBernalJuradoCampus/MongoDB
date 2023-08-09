import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";

const router = Router();

router.get("/vendedor", async (req,res)=>{
    try {
        const db = await connectionDB();
        const empleado = db.collection("empleados");

        const empleados = await empleado.find({Cargo: {$eq: "Vendedor"}}).toArray();
        res.send(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;