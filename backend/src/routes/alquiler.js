import { Router } from "express";
import {connectionDB} from "../../db/conexion.js";
import { limit } from "../middleware/limit.js";
import { middlewareVerify } from "../middleware/proxyAlquiler.js";
const router = Router();

router.get("/alquilado",limit(), async (req,res)=>{
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
        res.status(500).send({message: "Error en el servidor"});
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
        res.status(500).send({message: "Error en el servidor"});
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
        res.status(500).send({message: "Error en el servidor"});
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
        res.status(500).send({message: "Error en el servidor"});
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
        res.status(500).send({message: "Error en el servidor"});
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
        res.status(500).send({message: "Error en el servidor"});
    }
})

//Crud
router.get("/", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const result = await alquiler.find();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error en el servidor"});
    }
});
router.post("/", limit(), async (req,res)=>{
    /**
     * @var {req.body}
     * req.body = {
        "_id": 6,
        "ID_Alquiler": 3,
        "cliente_id": 2,
        "automovil_id": 4,
        "Fecha_Inicio": "2023-08-19",
        "Fecha_Fin": "2023-08-21",
        "Costo_Total": "600.000",
        "Estado": "Alquilado" }
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        await alquiler.insertOne({
            "_id": 6,
            "ID_Alquiler": 3,
            "cliente_id": 2,
            "automovil_id": 4,
            "Fecha_Inicio": "2023-08-19",
            "Fecha_Fin": "2023-08-21",
            "Costo_Total": "600.000",
            "Estado": "Alquilado"
        });
        res.status(201).send({message: "Agregado con exito"})
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error en el servidor"});
    }
});
router.put("/:id", limit(), async (req,res)=>{
    /**
     * @var {req.body, req.params.id}
     *  req.body = {
            "Costo_Total": "600.000",
            "Estado": "Alquilado"
        }
        req.params.id = {
            4
        }
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const id = req.params.id
        const {Costo_Total, Estado} = req.body;
        if (Costo_Total === undefined || Estado === undefined) throw {status: 406, message: "Los campos Costo_Total y Estado son obligatorios"}
        const nuevo = await alquiler.updateOne({_id: Math.floor(id)}, {$set: {
            "Costo_Total": Costo_Total,
            "Estado": Estado
        }});
        (nuevo.matchedCount === 0)
        ? res.status(404).send({message: "id no encontrado"})
        : res.status(202).send({message: "Actualizado con exito"});
    } catch (error) {
        (error.status)
        ? res.status(error.status).send({message: error.message})
        : (error.errInfo)
        ? res.status(417).send({message: error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
        : res.status(500).send({message: "Error en el servidor"})
    }
});
router.delete("/:id", limit(), async (req,res)=>{
    /**
     * @var {req.params.id}
     * req.params.id = 4
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const alquiler = db.collection("alquileres");

        const deleted = await alquiler.deleteOne({_id: Math.floor(req.params.id)});
        (deleted.deletedCount === 0)
        ? res.status(404).send({message: "Dato no encontrado"})
        : res.status(202).send({message: "Eliminado con exito"})
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error en el servidor"});
    }
});

export default router;