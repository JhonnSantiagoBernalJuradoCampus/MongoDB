import { Router } from "express";
import { connectionDB } from "../../db/conexion.js";
import { limit } from "../middleware/limit.js";

const router = Router();

router.get("/", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        let cliente = db.collection("clientes");

        let clientes = await cliente.find().toArray();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/dni/:dni", limit(),async (req,res)=>{
    /**
     * @var req.params.dni
     * req.params.dni = 489213981
     */
    try {
        const db = await connectionDB();
        const cliente = db.collection("clientes");
        let dni = await cliente.findOne({DNI: {$eq: Math.floor(req.params.dni)}});
        (dni === null) ? res.status(404).send({message: "Dato no encontrado"}) : res.send(dni);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/pendiente/:id", limit(), async (req,res)=>{
    /**
     * @var req.params.id
     *  req.params.id debe ser un numero
     */
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const cliente = db.collection("clientes");

        const pendiente = await cliente.aggregate([
            {
                $lookup: {
                    from: "reservas",
                    localField: "_id",
                    foreignField: "cliente_id",
                    as: "Reserva"
                }
            },
            {
                $project: {
                    "Reserva._id": 0,
                    "Reserva.automovil_id": 0,
                    "Reserva.Fecha_Reserva": 0
                }
            },
            {
                $project: {
                    "Reserva": {
                        $filter: {
                            input: "$Reserva",
                            as: "reserva",
                            cond: { $ne: ["$$reserva.Estado", "Reservado"] }
                        }
                    }
                }
            },
            {
                $match: {
                    "Reserva.Estado": "Pendiente",
                    "_id": Math.floor(req.params.id)
                }
            }
        ]).toArray();
        (pendiente[0] === undefined)? res.status(404).send({message: "Dato no encontrando"}) : res.send(pendiente);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/alquiler", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const cliente = db.collection("clientes");

        const alquiler = await cliente.aggregate([
            {
                $lookup: {
                    from: "alquileres",
                    localField: "_id",
                    foreignField: "cliente_id",
                    as: "Alquiler"
                }
            },
            {
                $match: {
                    "Alquiler": {$ne: []}
                }
            },
            {
                $project: {
                    "Alquiler": 0
                }
            }
        ]).toArray();
        res.send(alquiler);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor")
    }
})

router.get("/reserva/:id", limit(), async (req,res)=>{
    if(!req.rateLimit) return;
    try {
        const db = await connectionDB();
        const cliente = db.collection("clientes");

        const usuario = await cliente.aggregate([
            {
                $lookup: {
                    from: "reservas",
                    localField: "_id",
                    foreignField: "cliente_id",
                    as: "Reservas"
                }
            },
            {
                $match: {
                    "Reservas": {$ne: []},
                    "Reservas.ID_Reserva": Math.floor(req.params.id)
                }
            },
            {
                $project: {
                    "Reservas": 0
                }
            }
        ]).toArray();
        (usuario[0] === undefined) ? res.status(404).send({message: "Dato no encontrado"}) : res.send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor")
    }
})

export default router;