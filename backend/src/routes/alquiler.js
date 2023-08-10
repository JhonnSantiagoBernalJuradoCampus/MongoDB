import { Router } from "express";
import {connectionDB} from "../../db/conexion.js";
import { limit } from "../middleware/limit.js";

const router = Router();

router.get("/alquilado", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        let alquileres = await alquiler.aggregate([
            {
                $match: {
                    Estado: "Alquilado"
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
                $project: {
                    _id: 0,
                    "automovil_id": 0,
                    "Cliente.Direccion": 0
                }
            }
        ]).toArray(); 
        res.send(alquileres);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/id/:id", limit() ,async (req,res)=>{
    /**
     * @var req.params.id
     * El id debe ser un numero
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        let alquileres = await alquiler.findOne({"_id": Math.floor(req.params.id)});
        (alquileres !== null) ? res.send(alquileres) : res.status(404).send({message: "Dato no encontrado"});    
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }

});

router.get("/costo/:id", limit(),async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const costo = await alquiler
        .find({ID_Alquiler: Math.floor(req.params.id)})
        .project({ID_Alquiler: 1,Costo_Total: 1, _id: 0})
        .toArray();
        (costo[0] === undefined)? res.status(404).send({message: "Dato no encontrando"}) : res.send(costo);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/fecha", limit(),async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");
        
        const fecha = await alquiler.find({Fecha_Inicio: {$eq: "2023-07-05"}}).toArray();
        res.send(fecha)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/cantidad", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const cantidad = await alquiler.countDocuments();
        res.send({cantidad: cantidad});
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/entre", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const fecha = await alquiler.find({$and: [
            {Fecha_Inicio: {$gte: '2023-07-05'}},
            {Fecha_Inicio: {$lte: '2023-07-10'}}
        ]}).toArray();
        res.send(fecha);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
})

export default router;