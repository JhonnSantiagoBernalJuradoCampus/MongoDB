import express from "express";
import dotenv from "dotenv";
import alquilerRouter from "./routes/alquiler.js"
import clienteRouter from "./routes/cliente.js";
import automovilRouter from "./routes/automovil.js";
import reservaRouter from "./routes/reserva.js";
import empleadoRouter from "./routes/empleado.js";
import sucursalAutomovilRouter from "./routes/sucursalAutomovil.js";
import sucursalRouter from "./routes/sucursal.js";
import { appToken, appVerify } from "./middleware/token.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/token", appToken);

app.use("/alquiler", appVerify, alquilerRouter);
app.use("/cliente", appVerify, clienteRouter);
app.use("/automovil", appVerify, automovilRouter);
app.use("/reserva", appVerify, reservaRouter);
app.use("/empleado", appVerify, empleadoRouter);
app.use("/sucursal_automovil", appVerify, sucursalAutomovilRouter);
app.use("/sucursal", appVerify, sucursalRouter);

const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})