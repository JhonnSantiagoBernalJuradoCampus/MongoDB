import express from "express";
import dotenv from "dotenv";
import alquilerRouter from "./routes/alquiler.js"
import clienteRouter from "./routes/cliente.js";
import automovilRouter from "./routes/automovil.js";
import reservaRouter from "./routes/reserva.js";
import empleadoRouter from "./routes/empleado.js";
import sucursalAutomovilRouter from "./routes/sucursalAutomovil.js";
import sucursalRouter from "./routes/sucursal.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/alquiler", alquilerRouter);
app.use("/cliente", clienteRouter);
app.use("/automovil", automovilRouter);
app.use("/reserva", reservaRouter);
app.use("/empleado", empleadoRouter);
app.use("/sucursal_automovil", sucursalAutomovilRouter);
app.use("/sucursal", sucursalRouter);

const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})