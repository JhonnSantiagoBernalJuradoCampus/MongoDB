## MongoDB

### Extensión MongoDB para Visual Studio Code

"Mongodb for Visual Studio Code" es una extensión que permite a los desarrolladores interactuar con bases de datos MongoDB directamente desde Visual Studio Code. Esta extensión facilita la visualización y manipulación de datos, ejecución de comandos de MongoDB y ofrece sugerencias y autocompletado para facilitar el trabajo con la base de datos.

Para utilizar la extensión "MongoDB for Visual Studio Code", sigue los siguientes pasos:

1. Abre Visual Studio Code.
2. Ve al menú "Extensions" (Extensiones) en el panel izquierdo.
3. En el campo de búsqueda, escribe "MongoDB" y selecciona la extensión "MongoDB for Visual Studio Code" para instalarla.
4. Una vez instalada, debería aparecer un nuevo icono de MongoDB en la barra lateral izquierda de Visual Studio Code. Haz clic en él para empezar a trabajar con MongoDB.

### Código en MongoDB

El código proporcionado en MongoDB consiste en un conjunto de operaciones de creación e inserción de datos en una base de datos llamada "db_campus_alquiler". La base de datos contiene varias colecciones, entre ellas "sucursales", "automoviles", "sucursal_automoviles", "reservas", "alquileres", "clientes", "registro_devoluciones", "registro_entregas" y "empleados".

#### Creación de Colecciones

El código comienza con la creación de varias colecciones en la base de datos "db_campus_alquiler" utilizando el comando `db.createCollection()`. Cada colección representa un tipo de entidad, como "sucursales", "automoviles", "reservas", etc.

#### Inserción de Datos en las Colecciones

Luego, se realizan inserciones de datos utilizando el comando `db.collection.insertMany()`. Se insertan múltiples documentos en cada una de las colecciones, representando diferentes registros para cada entidad. Por ejemplo, se insertan sucursales, automóviles, clientes, etc., junto con sus atributos como "Nombre", "Direccion", "Telefono", etc.

#### Consultas Agregadas

Después de insertar los datos, se ejecutan una serie de consultas agregadas utilizando el método `db.collection.aggregate()`. Estas consultas están destinadas a obtener relaciones entre las diferentes colecciones. Se utilizan operaciones de agregación como `$lookup` para realizar uniones entre colecciones y proyectar los resultados deseados.

#### Consultas de Búsqueda

También se realizan algunas consultas de búsqueda utilizando el método `db.collection.find()`. Estas consultas se utilizan para obtener datos específicos de una colección o para filtrar los resultados.

Estas son 20 consultas explicadas y su respectivo código:

1. Mostrar todos los clientes registrados en la base de datos:
```javascript
use("db_campus_alquiler");
db.clientes.find();
```
Esta consulta simplemente busca y muestra todos los documentos en la colección "clientes".

2. Obtener todos los automóviles disponibles para alquiler:
```javascript
use("db_campus_alquiler");
db.automoviles.aggregate([
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
]);
```
Esta consulta realiza un "agregado" que combina la colección de "automoviles" con la colección "alquileres" para obtener solo los automóviles disponibles (cuyo estado sea "Disponible").

3. Listar todos los alquileres Alquilados junto con los datos de los clientes relacionados:
```javascript
use("db_campus_alquiler");
db.alquileres.aggregate([
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
]);
```
Esta consulta busca los alquileres con estado "Alquilado" y luego realiza un "lookup" para obtener los datos de los clientes asociados a cada alquiler.

4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado:
```javascript
use("db_campus_alquiler");
db.reservas.aggregate([
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
]);
```
Esta consulta busca las reservas con estado "Pendiente" y luego realiza dos "lookups" para obtener los datos de los clientes y los automóviles asociados a cada reserva.

5. Obtener los detalles del alquiler con el ID_Alquiler específico:
```javascript
use("db_campus_alquiler");
db.alquileres.find({ID_Alquiler: {$eq: 1}});
```
Esta consulta busca el alquiler con el ID_Alquiler igual a 1 en la colección "alquileres".

6. Listar los empleados con el Cargo de "Vendedor":
```javascript
use("db_campus_alquiler");
db.empleados.find({Cargo: {$eq: "Vendedor"}});
```
Esta consulta busca y muestra todos los empleados que tienen el cargo de "Vendedor" en la colección "empleados".

7. Mostrar la cantidad total de automóviles disponibles en cada sucursal:
```javascript
use("db_campus_alquiler");
db.sucursal_automoviles.aggregate([
    {
        $group: {
            "_id": "$sucursal_id",
            "Cantidad_Total_Disponible": { $sum: "$Cantidad_Disponible" }
        }
    }
]);
```
Esta consulta realiza un "agregado" en la colección "sucursal_automoviles" para agrupar por "sucursal_id" y luego suma la cantidad disponible de automóviles en cada sucursal.

8. Obtener el costo total de un alquiler específico:
```javascript
use("db_campus_alquiler");
db.alquileres.find({ID_Alquiler: {$eq: 2}},{_id: 0,ID_Alquiler: 1,Costo_Total: 1});
```
Esta consulta busca y muestra el costo total del alquiler con el ID_Alquiler igual a 2 en la colección "alquileres".

9. Listar los clientes con el DNI específico:
```javascript
use("db_campus_alquiler");
db.clientes.find({DNI: {$eq: 489213981}});
```
Esta consulta busca y muestra los clientes con el DNI igual a 489213981 en la colección "clientes".

10. Mostrar todos los automóviles con una capacidad mayor a 5 personas:
```javascript
use("db_campus_alquiler");
db.automoviles.find({Capacidad: {$gt: 5}});
```
Esta consulta busca y muestra todos los automóviles con capacidad mayor a 5 en la colección "automoviles".

11. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05':
```javascript
use("db_campus_alquiler");
db.alquileres.find({Fecha_Inicio: {$eq: "2023-07-05"}});
```
Esta consulta busca y muestra los detalles del alquiler que tiene fecha de inicio igual a '2023-07-05' en la colección "alquileres".

12. Listar las reservas pendientes realizadas por un cliente específico:
```javascript
use("db_campus_alquiler");
db.clientes.aggregate([
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
            "Reserva.Estado": "Pendiente"
        }
    }
]);
```
Esta consulta realiza un "agregado" en la colección "clientes" para obtener las reservas relacionadas con cada cliente y luego filtra solo las reservas con estado "Pendiente".

13. Mostrar los empleados con cargo de "Gerente" o "Asistente":
```javascript
use("db_campus_alquiler")
db.empleados.find({$or: [
    {Cargo: {$eq: "Gerente"}},
    {Cargo: {$eq: "Asistente"}}
]});
``

`
Esta consulta busca y muestra los empleados que tienen cargo de "Gerente" o "Asistente" en la colección "empleados".

14. Obtener los datos de los clientes que realizaron al menos un alquiler:
```javascript
use("db_campus_alquiler")
db.clientes.aggregate([
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
            "Alquiler._id": 0,
            "Alquiler.automovil_id": 0,
            "Alquiler.Fecha_Inicio": 0,
            "Alquiler.Fecha_Fin": 0,
            "Alquiler.Costo_Total": 0
        }
    }
]);
```
Esta consulta realiza un "agregado" en la colección "clientes" para obtener los alquileres relacionados con cada cliente y luego filtra solo aquellos clientes que tienen al menos un alquiler realizado.

15. Listar todos los automóviles ordenados por marca y modelo:
```javascript
use("db_campus_alquiler");
db.automoviles.aggregate([
    {
        $sort: {
            "Marca":1,
            "Modelo": 1 
        }
    }
]);
```
Esta consulta realiza un "agregado" en la colección "automoviles" y ordena los documentos por los campos "Marca" y "Modelo" en orden ascendente.

16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección:
```javascript
use("db_campus_alquiler");
db.sucursales.aggregate([
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
]);
```
Esta consulta realiza un "agregado" en la colección "sucursales" para obtener los automóviles relacionados con cada sucursal y luego muestra solo aquellas sucursales que tienen al menos un automóvil asociado.

17. Obtener la cantidad total de alquileres registrados en la base de datos:
```javascript
use("db_campus_alquiler");
db.alquileres.find().count();
```
Esta consulta cuenta la cantidad de documentos en la colección "alquileres" para obtener la cantidad total de alquileres registrados.

18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles:
```javascript
use("db_campus_alquiler");
db.automoviles.aggregate([
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
]);
```
Esta consulta realiza un "agregado" en la colección "automoviles" para obtener los alquileres relacionados con cada automóvil y luego muestra solo aquellos automóviles que tienen capacidad igual a 5 y están disponibles.

19. Obtener los datos del cliente que realizó la reserva con ID_Reserva específico:
```javascript
use("db_campus_alquiler");
db.clientes.aggregate([
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
            "Reservas.ID_Reserva": 5
        }
    },
    {
        $project: {
            "Reservas": 0
        }
    }
]);
```
Esta consulta realiza un "agregado" en la colección "clientes" para obtener las reservas relacionadas con cada cliente y luego muestra solo aquel cliente que tiene una reserva con el ID_Reserva igual a 5.

20. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10':
```javascript
use("db_campus_alquiler");
db.alquileres.find({$and: [
    {Fecha_Inicio: {$gte: '2023-07-05'}},
    {Fecha_Inicio: {$lte: '2023-07-10'}}
]});
```
Esta consulta busca y muestra los alquileres que tienen fecha de inicio entre '2023-07-05' y '2023-07-10' en la colección "alquileres".

### Conclusiones

En resumen, el código proporcionado realiza una serie de operaciones de creación e inserción de datos en una base de datos MongoDB llamada "db_campus_alquiler". Luego, se ejecutan consultas agregadas y de búsqueda para obtener relaciones y datos específicos de las colecciones.

La extensión "MongoDB for Visual Studio Code" es una herramienta útil para interactuar y trabajar con bases de datos MongoDB directamente desde Visual Studio Code, lo que facilita el desarrollo y la manipulación de datos. Puedes utilizarla para ejecutar consultas, ver resultados y obtener sugerencias mientras trabajas con MongoDB.

## Contacto

Autor: Jhon Santiago Bernal Jurado.

**Gmail**: jbernalsantiago11@gmail.com