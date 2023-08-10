import { Router } from "express";
import {connectionDB} from "../../db/conexion.js";
import { limit } from "../middleware/limit.js";

const router = Router();

router.get("/disponible", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
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

router.get("/mayor", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const automovil = db.collection("automoviles");
        
        const mayor = await automovil.find({Capacidad: {$gt: 5}}).toArray();
        res.send(mayor);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/ordenado", limit() ,async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const automovil = db.collection("automoviles");

        const ordenado = await automovil.aggregate([{
            $sort: {
                "Marca":1,
                "Modelo": 1 
            }
        }]).toArray();
        res.send(ordenado)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/capacidad", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const automovil = db.collection("automoviles");

        const mayor = await automovil.aggregate([
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
                    "Capacidad": 5,
                    "Alquiler.Estado": "Disponible"
                }
            }
        ]).toArray();
        (mayor[0] === undefined) ? res.status(404).send({message: "No hay datos que coincidan"}) : res.send(mayor);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;