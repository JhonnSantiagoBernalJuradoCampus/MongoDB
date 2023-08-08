import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
const automovil = db.collection("automoviles");

router.get("/disponible", async (req,res)=>{
    const automoviles = await automovil.aggregate([
        {
            $lookup: {
                from: "alquileres",
                localField: "_id",
                foreignField: "automovil_id",
                as: "Alquiler"
            }
        },
        {
            $match: {
                "Alquiler.Estado": "Disponible"
            }
        },
        {
            $project: {
                "Alquiler": 0
            }
        }
    ]).toArray();
    res.send(automoviles);
});

export default router;