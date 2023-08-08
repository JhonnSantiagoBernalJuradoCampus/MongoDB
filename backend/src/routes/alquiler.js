import { Router } from "express";
import con from "../../db/conexion.js";

const router = Router();
const db = await con();
let alquiler = db.collection("alquileres");

router.get("/alquilado", async (req,res)=>{
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
});

router.get("/id/:id", async (req,res)=>{
    /**
     * @var req.params.id
     * El id debe ser un numero
     */
    let alquileres = await alquiler.findOne({"_id": Math.floor(req.params.id)});
    (alquileres !== null) ? res.send(alquileres) : res.status(404).send({message: "Dato no encontrado"}) 
    
});

router.get("/costo/:id", async (req,res)=>{
    const costo = await alquiler.find({ID_Alquiler: {$eq: Math.floor(req.params.id)}},{ID_Alquiler: 1,Costo_Total: 1}).toArray();
    res.send(costo);
});

export default router;