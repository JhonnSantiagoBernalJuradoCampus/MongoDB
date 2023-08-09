import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";

const router = Router();

router.get("/automovil", async (req,res)=>{
    try {
        const db = await connectionDB();
        const sucursal_automovil = db.collection("sucursal_automoviles");

        const cantidad = await sucursal_automovil.aggregate([
            {
                $group: {
                    "_id": "$sucursal_id",
                    "Cantidad_Total_Disponible": { $sum: "$Cantidad_Disponible" }
                }
            }
        ]).toArray();
        res.send(cantidad);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;