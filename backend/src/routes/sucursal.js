import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";

const router = Router();

router.get("/automovil", async (req,res)=>{
    try {
        const db = await connectionDB();
        const sucursal = db.collection("sucursales");

        const automovil = await sucursal.aggregate([
            {
                $lookup: {
                    from: "sucursal_automoviles",
                    localField: "_id",
                    foreignField: "sucursal_id",
                    as: "Automovil"
                }
            },
            {
                $match: {
                    "Automovil": {$ne: []}
                }
            }
        ]).toArray();
        res.send(automovil);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;