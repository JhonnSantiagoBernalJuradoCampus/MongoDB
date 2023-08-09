import { Router } from "express";
import {connectionDB} from "../../db/conexion.js";

const router = Router();

router.get("/disponible", async (req,res)=>{
    try {
        const db = await connectionDB();
        const automovil = db.collection("automoviles");

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
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;