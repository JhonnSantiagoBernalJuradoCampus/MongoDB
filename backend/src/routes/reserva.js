import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
const reserva = db.collection("reservas");

router.get("/pendiente", async (req,res)=>{
    const reservas = await reserva.aggregate([
        {
            $match: {
                "Estado": "Pendiente"
            }
        },
        {
            $lookup: {
                from: "clientes",
                localField: "cliente_id",
                foreignField: "ID_Cliente",
                as: "Cliente"
            }
        },
        {
            $lookup: {
                from: "automoviles",
                localField: "automovil_id",
                foreignField: "ID_Automovil",
                as: "Automovil"
            }
        }
    ]).toArray();
    res.send(reservas);
});

export default router;