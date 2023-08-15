import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";
import { limit } from "../middleware/limit.js";

const router = Router();

router.get("/automovil", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
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
        res.status(500).send({message: "Error en el servidor"});
    }
});

//crud
router.get("/", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const sucursal = db.collection("sucursales")
        
        const result = await sucursal.find().toArray();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Error en el servidor"});
    }
});
router.post("/", limit(), async (req,res)=>{
    /**
     * @var {req.body}
     * req.body =
        {
            "_id": 6,
            "ID_sucursal": 3,
            "Nombre": "Cabecera",
            "Direccion": "United states",
            "Telefono": 123124124
        }
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const sucursal = db.collection("sucursales");
        
        const nuevo = await sucursal.insertOne(req.body);
        res.status(201).send({message: "Creado correctamente"})
    } catch (error) {
        if(error.keyValue) res.status(406).send({message: `La sucursal con _id: ${error.keyValue._id} ya existe`})
        else{
            const err = error.errInfo.details.schemaRulesNotSatisfied[0];
            (err.missingProperties)
            ? res.status(417).send({message: `El campo ${err.missingProperties[0]} es obligatorio`})
            : (err.propertiesNotSatisfied)
            ? res.status(417).send({message: err.propertiesNotSatisfied[0].description})
            : res.status(500).send({message: error})
        }
    }
});
router.put("/:id", limit(), async (req,res)=>{
    /**
     * @var {req.body, req.params.id}
        req.body = {
            "Nombre": "La colina",
            "Direccion": "United states",
            "Telefono": 123124124
        }
        req.params.id = 4
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const sucursal = db.collection("sucursales")
        
        const { Nombre, Direccion, Telefono} = req.body

        const put = await sucursal.updateOne({_id: Math.floor(req.params.id)}, {$set: {
            "Nombre": Nombre,
            "Direccion": Direccion,
            "Telefono": Telefono
        }});
        if(put.modifiedCount === 0) throw {status: 417, message: "id no encontrado"}
        res.send({message: "Actualizado con exito"})
    } catch (error) {
        console.error(error);
        (error.status)
        ? res.status(error.status).send({message: error.message})
        : res.status(500).send({message: "Error en el servidor"});
    }
});
router.delete("/:id", limit(), async (req,res)=>{
    /**
     * @var {req.params.id}
     * req.params.id = 5
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const sucursal = db.collection("sucursales");

        const deleted = await sucursal.deleteOne({_id: Math.floor(req.params.id)});
        if(deleted.deletedCount === 0) throw {status: 404, message: "dato no encontrado"}
        res.send({message: "Eliminado con exito"});
    } catch (error) {
        console.error(error);
        (error.status)
        ? res.status(error.status).send({message: error.message})
        : res.status(500).send({message: "Error en el servidor"});
    }
});

export default router;