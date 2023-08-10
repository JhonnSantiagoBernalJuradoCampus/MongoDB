# Alquiler MongoDB
## Diagrama base de datos
Ejercicio de alquileres para practicar mongo, se creo la base de datos según este diagrama

<img src="./backend/assets/diagramaGuia.png">

# Manual de uso
1. Clonar este repositorio
2. Se recomienda tener instalada la extensión `MongoDB for Vs Code`
3. Para utilizar la extensión siga los siguientes pasos:
    - Abra la extensión en el panel izquierdo en el simbolo de hoja
    - En conexiones abra el panel de nueva coleccion
    - ingrese esta conexion: `mongodb+srv://sputnik:12345@ejemplocluster.p78ttxa.mongodb.net/`
4. **SOLO SI** desea utilizar una conexion distinta en Athlas ejecute el archivo que se encuentra en : `./backend/db/query.mongodb`
    - Para ejecutar las consultas debe entrar al archivo y dale en el icono que se encuentra arriba a la derecha de play

# Instalacion
1. Despues de clonar el respositorio abra la terminal y ejecute el comando `npm i` el cual instalara todas las dependencias requeridas
2. Cambie el nombre del archivo `.env.example` a `.env`
3. Ejecute el comando `npm run dev` el cual iniciara el servidor
4. Para realizar las consultas deberá tener instalada la extensión Thunder Client y darle en `New Request`
# Api
## **uri**: `http://127.02.1.6:5010`
## Get
### Endpoints
1. `/cliente` Mostrar todos lo clientes registrados en la base de datos.
2. `/automovil/disponible` Obtener todos los automoviles disponibles para alquiler.
3. `/alquiler/alquilado` Listar todos los alquileres Alquilado junto con los datos de los clientes relacionados.
4. `/reserva/pendiente` Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
5. `/id/:id` **Importante** debe cambiar el `:id` por un **numero**. Obtener los detalles del alquiler con el ID_Alquilerespecífico.
6. `/empleado/vendedor` Listar los empleados con el Cargo de "Vendedor".
7. `/sucursal_automovil/automovil` Mostrar la cantidad total de automóviles disponibles en cada sucursal.
8. `/alquiler/costo/:id` Obtener el costo total de un alquiler específico.
9. `/dni/:dni` **Importante** debe cambiar el `:dni` por el dni especifico ejemplo: `489213981`. Listar los clientes con el DNI específico.
10. `/automovil/mayor` Mostrar todos los automóviles con una capacidad mayor a 5 personas.
11. `/alquiler/fecha` Obtener los detalles del alquiler que tiene fecha de inicio en.
12. `/cliente/pendiente/:id` **Importante** debe cambiar el `:id` por un **numero**. Listar las reservas pendientes realizadas por un cliente específico.
13. `/empleado/cargo` Mostrar los empleados con cargo de "Gerente" o "Asistente.
14. `/cliente/alquiler` Obtener los datos de los clientes que realizaron al menos un alquiler.
15. `/automovil/ordenado` Listar todos los automóviles ordenados por marca y modelo.
16. `/sucursal/automovil` Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
17. `/alquiler/cantidad` Obtener la cantidad total de alquileres registrados en la base de datos. 
18. `/automovil/capacidad` Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
19. `/cliente//reserva/:id` **Importante** debe cambiar el `:id` por un **numero**. Obtener los datos del cliente que realizó la reserva con ID_Reserva específico.
20. `/alquiler/entre` Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
## Contacto
Autor: Jhon Santiago Bernal Jurado.


**Gmail**: jbernalsantiago11@gmail.com