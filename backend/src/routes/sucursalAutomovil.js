import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
const sucursal_automovil = db.collection("sucursal_automoviles");

router.get("/automovil", async (req,res)=>{
    const cantidad = await sucursal_automovil.aggregate([
        {
            $group: {
                "_id": "$sucursal_id",
                "Cantidad_Total_Disponible": { $sum: "$Cantidad_Disponible" }
            }
        }
    ]).toArray();
    res.send(cantidad);
});

export default router;