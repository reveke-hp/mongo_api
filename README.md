[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/4hwhOlRP)
# Estrategias de Persistencia - TP-2 2024 (Versión MongoDB)

Este trabajo práctico tiene como objetivo principal que los alumnos adquieran experiencia práctica en la implementación de asociaciones 1 a N y N a M en el contexto de una API REST utilizando un **_ODM_** (Object Document Mapper).

- Asociaciones:
Las asociaciones 1 a N y N a M son conceptos fundamentales en el diseño de bases de datos documentales. En una asociación 1 a N, un documento puede tener una lista de referencias a otros documentos **o incluso embebidos directamente en el documento**. En una asociación N a M, varios documentos pueden referenciarse mutuamente a través de listas de identificadores.

- API REST:
Una API REST (Representational State Transfer) es un conjunto de reglas y convenciones para la creación de servicios web que permiten la comunicación entre sistemas. En este trabajo práctico, utilizaremos una API REST para exponer recursos y permitir operaciones CRUD (Create, Read, Update, Delete) sobre estos recursos.

- Enfoque Práctico:
Los alumnos implementarán las asociaciones mencionadas anteriormente en el contexto de una API REST utilizando un ODM específico, **Mongoose**. Se espera que los alumnos comprendan cómo definir esquemas, establecer relaciones entre ellos y utilizar las capacidades del ODM para interactuar con la base de datos.

- Criterios de Evaluación:
Se evaluará la precisión y completitud en la implementación de las asociaciones en la API REST, así como la funcionalidad completa del CRUD para los recursos expuestos por la API.

## Modelo Documental a Implementar

Basándose en el siguiente diagrama conceptual, deberán generar los esquemas y las asociaciones en Mongoose para que la API pueda interactuar con la base de datos a través de los modelos.

### Descripción del modelo conceptual
- Una Carrera puede tener muchas materias.
- Una Materia puede ser dictada en muchos cursos.
- Un Curso puede ser dictado por muchos profesores.
- Un Profesor puede dictar muchos cursos.

### Base Documental
El motor de base documental a utilizar será **MongoDB** y deberá estar dockerizado guardando los datos en un volumen externo al contenedor.

Para simplifincar esta tarea a los alumnos se entrega en la carpata **./mongo** de este proyecto un archivo docker-compose.yml que levanta los contenedores del motor mongo y de un cliente llamado mongo-express de forma simple, solo deben correr el siguiente comando dentro del directorio **./mongo***
````
docker-compose -up -d
````  
La configuración de este docker-compose ya incluye la generación del volumen externo al contenedor y guarda todos los datos dentro de la carpeta **./mongo/data**

Luego de correr el comando, si desean ingrear al motor mongo a través del cliente mongo-express ingrerar a http://localhost:8081


### Intalacion de dependencias
Debera contar con las dependencias de produccion y desarrollo necesarias de un proyecto node. Por ejemplo:

```npm i mongoose```

```npm i -D nodemon``` 

### Tips 
 - Crear un modelo simple
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarreraSchema = new Schema({
  nombre: String,
  grado: String,
  universidad: String
});

const Carrera = mongoose.model('Carrera', CarreraSchema);
```
- Repositorio de ayuda
Por si necesitan ayuda extra sobre los modelos, puedan consultar este repo https://github.com/gonzagerunpaz/apiMongo y mirar como un documento puede tener una lista de referencias a otros documentos o incluso embebidos directamente en el documento.

## API
Implementar la API utilizando el framework Express en el entorno de ejecución de un proyecto NodeJs. Organizar el código en rutas, controladores y middleware utilizando la separación por recurso. A continuación se detallan los endpoints que deberán estar disponibles en la API.

|Verbo|Recurso|Status code|Descripción|
|-----|-------|-----------|-----------|
|Get|/carreras|200|Obtener todas la carreras|
|Get|/carreras/:id|200, 404|Obtener una carrera en particular|
|Post|/carreras|201 , 400|Crear una Carrera|
|Post|/carreras/:id/materia|201, 404, 400|Crea un materia dentro de una carrera|
|Get|/carreras/:id/materias|200, 404| Obtener todas la materias de una Carrera
|Get|/materias|200|Obtener todas las materias|
|Get|/materias/:id|200, 404|Obtener una materia en particular|
|Delete|/materias/:id|200, 404|Borra una materia en particular|
|Post|/materias/:id/curso|201, 404, 400|Crea un Curso para la la Materia|
|Get|/materias/:id/cursos|200, 404| Obtener los Curso de la Materia
|Get|/cursos|200|Obtener todos los cursos|
|Get|/cursos/:id|200, 404|Obtener un curso en particular|
|Delete|/cursos/:id|200, 404|Borra un curso en particular|
|Put|/cursos/:id|200, 404|Modificar los datos de un curso particular
|Get|/profesores|200|Obtener todos los profesores
|Get|/profesores/:id|200, 404|Obtener un profesor en particular
|Post|/profesores|201, 400|Crear un profesor
|Put|/profesores/:id|200, 404|Modificar lo datos de un profesor
|Delete|/profesores/:id|200, 404, 500|Borrar un profesor
|Post|/cursos/:id/profesores|201, 404, 400|Crea la asociacion curso con 1 o N profesores
|Get|/cursos/:id/profesores|202, 404|Obtener todos los profesores de un Curso
|Get|/profesores/:id/cursos|200, 400|Obtener todos los curso que tiene un profesro

## Ejemplos
A modo de ejemplo se muestra el resultado de algunas respuesta de los endpoind detallado en la tabla de la sección anterior.

Recurso:  **_/profesores/1/cursos_**

Obtiene los datos del profesor registrado con el id 1, con todos los cursos que tiene asociado con sus correspondientes atributos y de cada curso se muetra todos los datos de las materias.

```
{
    "_id": "60d5f4b5fc13ae1e7d00000e",
    "nombre": "Gerardo",
    "fechaNacimiento": "1975-08-12",
    "legajo": 24911146,
    "activo": true,
    "cursos": [
        {
            "_id": "60d5f4b5fc13ae1e7d00000f",
            "comision": "N1",
            "turno": "Noche",
            "fechaInicio": "2024-03-14",
            "fechaFin": "2024-06-29",
            "materiaId": "60d5f4b5fc13ae1e7d000010",
            "materia": {
                "_id": "60d5f4b5fc13ae1e7d000010",
                "nombre": "Objetos 1",
                "cuatrimestral": true,
                "anio": 1,
                "carreraId": "60d5f4b5fc13ae1e7d000011"
            }
        },
        {
            "_id": "60d5f4b5fc13ae1e7d000012",
            "comision": "M1",
            "turno": "Mañana",
            "fechaInicio": "2024-03-14",
            "fechaFin": "2024-06-29",
            "materiaId": "60d5f4b5fc13ae1e7d000010",
            "materia": {
                "_id": "60d5f4b5fc13ae1e7d000010",
                "nombre": "Objetos 1",
                "cuatrimestral": true,
                "anio": 1,
                "carreraId": "60d5f4b5fc13ae1e7d000011"
            }
        },
        {
            "_id": "60d5f4b5fc13ae1e7d000013",
            "comision": "N1",
            "turno": "Noche",
            "fechaInicio": "2024-03-14",
            "fechaFin": "2024-06-29",
            "materiaId": "60d5f4b5fc13ae1e7d000014",
            "materia": {
                "_id": "60d5f4b5fc13ae1e7d000014",
                "nombre": "Estrategias Persistencia",
                "cuatrimestral": true,
                "anio": 1,
                "carreraId": "60d5f4b5fc13ae1e7d000011"
            }
        }
    ]
}

```

Recurso: **_/cursos/1/profesores_**

Obtiene los datos del curso registrado con el id 1, con todos los profesores que tiene asociado con sus correspondientes atributos y de cada profesor se muetra todos los datos del mismo.

```
{
    "_id": "60d5f4b5fc13ae1e7d00000f",
    "comision": "N1",
    "turno": "Noche",
    "fechaInicio": "2024-03-14",
    "fechaFin": "2024-06-29",
    "materiaId": "60d5f4b5fc13ae1e7d000010",
    "materia": {
        "_id": "60d5f4b5fc13ae1e7d000010",
        "nombre": "Objetos 1",
        "cuatrimestral": true,
        "anio": 1,
        "carreraId": "60d5f4b5fc13ae1e7d000011"
    },
    "profesores": [
        {
            "_id": "60d5f4b5fc13ae1e7d00000e",
            "nombre": "Gerardo",
            "fechaNacimiento": "1975-08-12",
            "legajo": 24911146,
            "activo": true
        },
        {
            "_id": "60d5f4b5fc13ae1e7d000015",
            "nombre": "Florencia",
            "fechaNacimiento": "1974-03-29",
            "legajo": 24535032,
            "activo": true
        }
    ]
}

```

## Consideraciones Finales sobre la Entrega

- El equipo deberá entregar un repositorio de GitHub con todas las instrucciones necesarias para correr la API.
- Deberán detallar los comandos necesarios para la instalación y ejecución de la API.
- El puerto de escucha deberá ser configurable por variable de entorno.
 
 ## Consideraciones técnicas específicas para MongoDB

 1. Estructura de los esquemas: Los modelos de datos deben definirse como esquemas de Mongoose. Las asociaciones se representarán mediante referencias (ObjectId).

2. Referencias en lugar de relaciones:

- En una base de datos documental como MongoDB, no existen las tablas ni las relaciones en el sentido tradicional de SQL. En su lugar, se utilizan referencias (ObjectId) para asociar documentos.
- Para asociaciones 1 a N, se pueden utilizar matrices de referencias dentro de un documento. Para N a M, cada documento referenciará múltiples otros documentos.
3. Ejemplo de Esquemas Mongoose:
```
// Carrera Schema
const CarreraSchema = new Schema({
  nombre: String,
  grado: String,
  universidad: String,
  materias: [{ type: Schema.Types.ObjectId, ref: 'Materia' }]
});

// Materia Schema
const MateriaSchema = new Schema({
  nombre: String,
  cuatrimestral: Boolean,
  anio: Number,
  carrera: { type: Schema.Types.ObjectId, ref: 'Carrera' },
  cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]
});

// Curso Schema
const CursoSchema = new Schema({
  comision: String,
  turno: String,
  fechaInicio: Date,
  fechaFin: Date,
  materia: { type: Schema.Types.ObjectId, ref: 'Materia' },
  profesores: [{ type: Schema.Types.ObjectId, ref: 'Profesor' }]
});

// Profesor Schema
const ProfesorSchema = new Schema({
  nombre: String,
  fechaNacimiento: Date,
  legajo: Number,
  activo: Boolean,
  cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]
});
```

4. Controladores y Rutas:

- Los controladores deben manejar las operaciones CRUD y las asociaciones utilizando Mongoose.
- Las rutas deben estar organizadas según los recursos y utilizar controladores para las operaciones.

5. Configuración de la Base de Datos:

- La configuración de conexión a MongoDB debe estar en un archivo de configuración y ser fácilmente cambiable mediante variables de entorno.