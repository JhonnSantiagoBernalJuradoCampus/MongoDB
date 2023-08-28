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
# Token
1. **Crear** el token, debe acceder al endpoint `/token/mongo` el cual será el que le permitirá acceder a todas las rutas
2. Copiar el token y ponerlo en headers en el espaciado **Authorization**  como en este ejemplo: 
<img src="./backend/assets/ejemplo.png">

## Get
### Endpoints
1. `/cliente` Mostrar todos lo clientes registrados en la base de datos.
    <details>
    <summary>Ejemplo de datos de salida</summary>    

    ```json
    [
        {
            "_id": 1,
            "ID_Cliente": 1,
            "Nombre": "Jhon",
            "Apellido": "Bernal",
            "DNI": 109821901,
            "Direccion": "Cr 6 #90-12",
            "Telefono": 3123860654,
            "Email": "jbernalsantiago@gmail.com"
        },
        {
            "_id": 2,
            "ID_Cliente": 2,
            "Nombre": "Daniel",
            "Apellido": "Hernandez",
            "DNI": 489213981,
            "Direccion": "Cr 4 #20-10",
            "Telefono": 3123342422,
            "Email": "danielhernandez@gmail.com"
        },
        {
            "_id": 3,
            "ID_Cliente": 3,
            "Nombre": "Diego",
            "Apellido": "Quintero",
            "DNI": 109532412,
            "Direccion": "Cr 3 #30-2",
            "Telefono": 3118124324,
            "Email": "diegoquintero@gmail.com"
        },
        {
            "_id": 4,
            "ID_Cliente": 4,
            "Nombre": "Angie",
            "Apellido": "Cala",
            "DNI": 100532853,
            "Direccion": "Cr 1 #50-40",
            "Telefono": 3118128028,
            "Email": "angiecala@gmail.com"
        },
        {
            "_id": 5,
            "ID_Cliente": 5,
            "Nombre": "Angela",
            "Apellido": "Esperanza",
            "DNI": 63542975,
            "Direccion": "Cr 20 #10-10",
            "Telefono": 3166010786,
            "Email": "angelaesperanza@gmail.com"
        }
    ]
    ```

    </details>
2. `/automovil/disponible` Obtener todos los automoviles disponibles para alquiler.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 2,
            "ID_Automovil": 2,
            "Marca": "Renault",
            "Modelo": "Renault 123",
            "Anio": 2020,
            "Tipo": "Carro",
            "Capacidad": 6,
            "Precio_Diario": "300.000"
        },
        {
            "_id": 3,
            "ID_Automovil": 3,
            "Marca": "Renault",
            "Modelo": "Renault 321",
            "Anio": 2021,
            "Tipo": "Carro",
            "Capacidad": 7,
            "Precio_Diario": "122.000"
        },
        {
            "_id": 5,
            "ID_Automovil": 5,
            "Marca": "Renault",
            "Modelo": "Renault 543",
            "Anio": 2019,
            "Tipo": "Carro",
            "Capacidad": 4,
            "Precio_Diario": "102.000"
        }
    ]
    ```
    </details>
3. `/alquiler/alquilado` Listar todos los alquileres Alquilado junto con los datos de los clientes relacionados.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "ID_Alquiler": 1,
            "cliente_id": 1,
            "Fecha_Inicio": "2023-08-19",
            "Fecha_Fin": "2023-08-21",
            "Costo_Total": "600.000",
            "Estado": "Alquilado",
            "Cliente": [
            {
                "_id": 1,
                "ID_Cliente": 1,
                "Nombre": "Jhon",
                "Apellido": "Bernal",
                "DNI": 109821901,
                "Telefono": 3123860654,
                "Email": "jbernalsantiago@gmail.com"
            }
            ]
        },
        {
            "ID_Alquiler": 4,
            "cliente_id": 3,
            "Fecha_Inicio": "2023-08-22",
            "Fecha_Fin": "2023-08-24",
            "Costo_Total": "800.000",
            "Estado": "Alquilado",
            "Cliente": [
            {
                "_id": 3,
                "ID_Cliente": 3,
                "Nombre": "Diego",
                "Apellido": "Quintero",
                "DNI": 109532412,
                "Telefono": 3118124324,
                "Email": "diegoquintero@gmail.com"
            }
            ]
        }
    ]
    ```
    </details>
4. `/reserva/pendiente` Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 1,
            "ID_Reserva": 1,
            "cliente_id": 2,
            "automovil_id": 1,
            "Fecha_Reserva": "11/08/2023",
            "Fecha_Inicio": "18/08/2023",
            "Fecha_Fin": "20/08/2023",
            "Estado": "Pendiente",
            "Cliente": [
                {
                    "_id": 2,
                    "ID_Cliente": 2,
                    "Nombre": "Daniel",
                    "Apellido": "Hernandez",
                    "DNI": 489213981,
                    "Direccion": "Cr 4 #20-10",
                    "Telefono": 3123342422,
                    "Email": "danielhernandez@gmail.com"
                }
            ],
            "Automovil": [
                {
                    "_id": 1,
                    "ID_Automovil": 1,
                    "Marca": "Renault",
                    "Modelo": "Renault Sandero",
                    "Anio": 2023,
                    "Tipo": "Carro",
                    "Capacidad": 4,
                    "Precio_Diario": "500.000"
                }
            ]
        },
        {
            "_id": 2,
            "ID_Reserva": 2,
            "cliente_id": 1,
            "automovil_id": 1,
            "Fecha_Reserva": "13/08/2023",
            "Fecha_Inicio": "19/08/2023",
            "Fecha_Fin": "22/08/2023",
            "Estado": "Pendiente",
            "Cliente": [
                {
                    "_id": 1,
                    "ID_Cliente": 1,
                    "Nombre": "Jhon",
                    "Apellido": "Bernal",
                    "DNI": 109821901,
                    "Direccion": "Cr 6 #90-12",
                    "Telefono": 3123860654,
                    "Email": "jbernalsantiago@gmail.com"
                }
            ],
            "Automovil": [
                {
                    "_id": 1,
                    "ID_Automovil": 1,
                    "Marca": "Renault",
                    "Modelo": "Renault Sandero",
                    "Anio": 2023,
                    "Tipo": "Carro",
                    "Capacidad": 4,
                    "Precio_Diario": "500.000"
                }
            ]
        }
    ]
    ```
    </details>
5. `/alquiler/id/:id` **Importante** debe cambiar el `:id` por un **numero**. Obtener los detalles del alquiler con el ID_Alquilerespecífico.
    <details>
    <summary>Ejemplo de datos de salida cuando el id es 5</summary>

    ```json
    {
        "_id": 5,
        "ID_Alquiler": 5,
        "cliente_id": 4,
        "automovil_id": 5,
        "Fecha_Inicio": "2023-08-24",
        "Fecha_Fin": "2023-08-27",
        "Costo_Total": "900.000",
        "Estado": "Disponible"
    }
    ```
    </details>
6. `/empleado/vendedor` Listar los empleados con el Cargo de "Vendedor".
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 1,
            "ID_Empleado": 1,
            "Nombre": "James Ronald",
            "Apellido": "Bernal Bermudez",
            "DNI": 91514559,
            "Direccion": "Cr8 #12-12",
            "Telefono": 3127141832,
            "Cargo": "Vendedor"
        },
        {
            "_id": 5,
            "ID_Empleado": 5,
            "Nombre": "Andres",
            "Apellido": "Sepulveda",
            "DNI": 65423442,
            "Direccion": "Cr12 #12-12",
            "Telefono": 312314322,
            "Cargo": "Vendedor"
        }
    ]
    ```
    </details>
7. `/sucursal_automovil/automovil` Mostrar la cantidad total de automóviles disponibles en cada sucursal.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 5,
            "Cantidad_Total_Disponible": 4
        },
        {
            "_id": 1,
            "Cantidad_Total_Disponible": 5
        },
        {
            "_id": 4,
            "Cantidad_Total_Disponible": 8
        },
        {
            "_id": 2,
            "Cantidad_Total_Disponible": 3
        }
    ]   
    ```
    </details>
8. `/alquiler/costo/:id` Obtener el costo total de un alquiler específico.
    <details>
    <summary>Ejemplo de datos de salida cuando el id es 4</summary>

    ```json
    [
        {
            "ID_Alquiler": 4,
            "Costo_Total": "800.000"
        }
    ]   
    ```
    </details>
9. `/cliente/dni/:dni` **Importante** debe cambiar el `:dni` por el dni especifico ejemplo: `489213981`. Listar los clientes con el DNI específico.
    <details>
    <summary>Ejemplo de datos de salida</summary>
    
    ```json
    {
        "_id": 2,
        "ID_Cliente": 2,
        "Nombre": "Daniel",
        "Apellido": "Hernandez",
        "DNI": 489213981,
        "Direccion": "Cr 4 #20-10",
        "Telefono": 3123342422,
        "Email": "danielhernandez@gmail.com"
    }
    ```
    </details>
10. `/automovil/mayor` Mostrar todos los automóviles con una capacidad mayor a 5 personas.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 2,
            "ID_Automovil": 2,
            "Marca": "Renault",
            "Modelo": "Renault 123",
            "Anio": 2020,
            "Tipo": "Carro",
            "Capacidad": 6,
            "Precio_Diario": "300.000"
        },
        {
            "_id": 3,
            "ID_Automovil": 3,
            "Marca": "Renault",
            "Modelo": "Renault 321",
            "Anio": 2021,
            "Tipo": "Carro",
            "Capacidad": 7,
            "Precio_Diario": "122.000"
        }
    ]
    ```
    </details>
11. `/alquiler/fecha` Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 3,
            "ID_Alquiler": 3,
            "cliente_id": 1,
            "automovil_id": 3,
            "Fecha_Inicio": "2023-07-05",
            "Fecha_Fin": "2023-08-21",
            "Costo_Total": "500.000",
            "Estado": "Disponible"
        }
    ]
    ```
    </details>
12. `/cliente/pendiente/:id` **Importante** debe cambiar el `:id` por un **numero**. Listar las reservas pendientes realizadas por un cliente específico.
    <details>
    <summary>Ejemplo de dato de salida cuando el id es 1</summary>
    
    ```json
    [
        {
            "_id": 1,
            "Reserva": [
                {
                    "ID_Reserva": 2,
                    "cliente_id": 1,
                    "Fecha_Inicio": "19/08/2023",
                    "Fecha_Fin": "22/08/2023",
                    "Estado": "Pendiente"
                }
            ]
        }
    ]
    ```
    </details>
13. `/empleado/cargo` Mostrar los empleados con cargo de "Gerente" o "Asistente.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 2,
            "ID_Empleado": 2,
            "Nombre": "Stiven",
            "Apellido": "Carvajal",
            "DNI": 84392389,
            "Direccion": "Cr4 #20-40",
            "Telefono": 3124234876,
            "Cargo": "Gerente"
        },
        {
            "_id": 3,
            "ID_Empleado": 3,
            "Nombre": "Miguel",
            "Apellido": "Carrillo",
            "DNI": 64432341,
            "Direccion": "Cr2 #54-21",
            "Telefono": 312343245,
            "Cargo": "Asistente"
        },
        {
            "_id": 4,
            "ID_Empleado": 4,
            "Nombre": "Jolver",
            "Apellido": "Prado",
            "DNI": 53423412,
            "Direccion": "Cr43 #76-98",
            "Telefono": 312334344,
            "Cargo": "Asistente"
        }
    ]
    ```
    </details>
14. `/cliente/alquiler` Obtener los datos de los clientes que realizaron al menos un alquiler.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 1,
            "ID_Cliente": 1,
            "Nombre": "Jhon",
            "Apellido": "Bernal",
            "DNI": 109821901,
            "Direccion": "Cr 6 #90-12",
            "Telefono": 3123860654,
            "Email": "jbernalsantiago@gmail.com"
        },
        {
            "_id": 2,
            "ID_Cliente": 2,
            "Nombre": "Daniel",
            "Apellido": "Hernandez",
            "DNI": 489213981,
            "Direccion": "Cr 4 #20-10",
            "Telefono": 3123342422,
            "Email": "danielhernandez@gmail.com"
        },
        {
            "_id": 3,
            "ID_Cliente": 3,
            "Nombre": "Diego",
            "Apellido": "Quintero",
            "DNI": 109532412,
            "Direccion": "Cr 3 #30-2",
            "Telefono": 3118124324,
            "Email": "diegoquintero@gmail.com"
        },
        {
            "_id": 4,
            "ID_Cliente": 4,
            "Nombre": "Angie",
            "Apellido": "Cala",
            "DNI": 100532853,
            "Direccion": "Cr 1 #50-40",
            "Telefono": 3118128028,
            "Email": "angiecala@gmail.com"
        }
    ]
    ```
    </details>
15. `/automovil/ordenado` Listar todos los automóviles ordenados por marca y modelo.
    <details>
    <summary>Ejemplo de datos de salida</summary>
    
    ```json
    [
        {
            "_id": 2,
            "ID_Automovil": 2,
            "Marca": "Renault",
            "Modelo": "Renault 123",
            "Anio": 2020,
            "Tipo": "Carro",
            "Capacidad": 6,
            "Precio_Diario": "300.000"
        },
        {
            "_id": 3,
            "ID_Automovil": 3,
            "Marca": "Renault",
            "Modelo": "Renault 321",
            "Anio": 2021,
            "Tipo": "Carro",
            "Capacidad": 7,
            "Precio_Diario": "122.000"
        },
        {
            "_id": 4,
            "ID_Automovil": 4,
            "Marca": "Renault",
            "Modelo": "Renault 432",
            "Anio": 2010,
            "Tipo": "Carro",
            "Capacidad": 5,
            "Precio_Diario": "600.000"
        },
        {
            "_id": 5,
            "ID_Automovil": 5,
            "Marca": "Renault",
            "Modelo": "Renault 543",
            "Anio": 2019,
            "Tipo": "Carro",
            "Capacidad": 4,
            "Precio_Diario": "102.000"
        },
        {
            "_id": 1,
            "ID_Automovil": 1,
            "Marca": "Renault",
            "Modelo": "Renault Sandero",
            "Anio": 2023,
            "Tipo": "Carro",
            "Capacidad": 4,
            "Precio_Diario": "500.000"
        }
    ]
    ```
    </details>
16. `/sucursal/automovil` Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    [
        {
            "_id": 2,
            "ID_sucursal": 2,
            "Nombre": "Mexico",
            "Direccion": "City Mecico",
            "Telefono": 123457632,
            "Automovil": [
                {
                    "_id": 2,
                    "sucursal_id": 2,
                    "automovil_id": 3,
                    "Cantidad_Disponible": 3
                }
            ]
        },
        {
            "_id": 4,
            "ID_sucursal": 4,
            "Nombre": "La colina",
            "Direccion": "United Kingdom",
            "Telefono": 1234213413,
            "Telfono": null,
            "Automovil": [
                {
                    "_id": 4,
                    "sucursal_id": 4,
                    "automovil_id": 1,
                    "Cantidad_Disponible": 4
                },
                {
                    "_id": 5,
                    "sucursal_id": 4,
                    "automovil_id": 5,
                    "Cantidad_Disponible": 4
                }
            ]
        },
        {
            "_id": 5,
            "ID_sucursal": 5,
            "Nombre": "Miami",
            "Direccion": "EEUU",
            "Telefono": 754532344,
            "Automovil": [
                {
                    "_id": 3,
                    "sucursal_id": 5,
                    "automovil_id": 2,
                    "Cantidad_Disponible": 4
                }
            ]
        }
    ]
    ```
    </details>
17. `/alquiler/cantidad` Obtener la cantidad total de alquileres registrados en la base de datos.
    <details>
    <summary>Ejemplo de datos de salida</summary>
    
    ```json
    {
        "cantidad": 5
    }
    ```
    </details>
18. `/automovil/capacidad` Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
    <details>
    <summary>Ejemplo de datos de salida</summary>

    ```json
    {
        "message": "No hay datos que coincidan"
    }
    ```
    </details>
19. `/cliente/reserva/:id` **Importante** debe cambiar el `:id` por un **numero**. Obtener los datos del cliente que realizó la reserva con ID_Reserva específico.
    <details>
    <summary>Ejemplo de datos de salida cuando el id es 1</summary>

    ```json
    [
        {
            "_id": 2,
            "ID_Cliente": 2,
            "Nombre": "Daniel",
            "Apellido": "Hernandez",
            "DNI": 489213981,
            "Direccion": "Cr 4 #20-10",
            "Telefono": 3123342422,
            "Email": "danielhernandez@gmail.com"
        }
    ]
    ```
    </details>
20. `/alquiler/entre` Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
    <details>
    <summary>Ejemplo de datos de salida</summary>
    
    ```json
    [
        {
            "_id": 3,
            "ID_Alquiler": 3,
            "cliente_id": 1,
            "automovil_id": 3,
            "Fecha_Inicio": "2023-07-05",
            "Fecha_Fin": "2023-08-21",
            "Costo_Total": "500.000",
            "Estado": "Disponible"
        }
    ]
    ```
    </details>
## Contacto
Autor: Jhon Santiago Bernal Jurado.


**Gmail**: jbernalsantiago11@gmail.com