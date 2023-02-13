# backend-csv-file-uploader

## Objetivo

Crear un web App que procese cualquier archivo CSV con cualquier cantidad de columnas 
y de registros. 

* El archivo debe poder subirse a través de GUI. 
* Los registros del archivo deben ser insertados en una base de datos.
* Los registros almacenados se deben poder consultar y visualizar desde la web app. 

## Requisitos

* Debe tener un backend que exponga los servicios a traves de un rest api desarollado en alguno de los siguientes lenguajes (C#, Python, Node js).
* Base de datos en cualquiera de los siguientes motores mongo, sql server, oracle
* La interfaz debe ser desarrollada en algún framework de componentes (React,Vue, Angular)
* Los webservices deben estar asegurados para evitar el consumo de clientes no autorizados 

## Forma de Entrega

El código debe ser subido a un repositorio público de github con todo lo necesario (scripts 
de bd, codigo fuentes, en el readme deben explicar el proceso de despliegue y de 
ejecución del webapp y una breve explicación de lo desarrollado).

## Desarrollo del proyecto

Para el proyecto escogí hacer el backend en Nodejs, teniendo en cuenta su escalabilidad y facilidad para manipular archivos, mongodb para una fácil conexión y para el front se escogió React por su simplicidad.

Para iniciar debemos clonar el proyecto en nuestra máquina local, para ello, podemos utilizar el siguiente comando

```
git clone https://github.com/sebasam/backend-csv-file-uploader.git

npm i

```

Después de instalar las dependencias debemos crear un archivo .env con la siguiente estructura
PORT=puerto en que ejecutarás el servidor
MONGO_URL=La url de mongoatlas para conectar con la base de datos
SECRET_KEY=muchas palabra y números al azar para tú firma secreta en la generación del token


```
npm run dev

```

Después de ejecutar el comando, y si el archivo .env contiene todos los datos mencionados anteriormente el servidor y la base de datos conectarán sin problema.

## ENDPOINTS para probar el backend

* /api/upload permite cargar los archivos .csv
* /api/files trae todos los archivos subidos
* /api/files/:id trae un archivo por su id
* /api/delete/:id elimina un archivo por su id
* /api/register permite registrar un usuario
* /api/login permite iniciar sesión con los datos registrados

En la carpeta postman-collection, podrá encontrar estos endpoints con sus pruebas de ejemplo.

https://backend-csv-file-uploader-660y73y6b-sebasam.vercel.app/
En el anterior enlace podrá ver la aplicación corriendo en tiempo real, sin embargo depende de que tenga prendido el servidor.

## Caso de error en las pruebas

Si llega a fallar la prueba, se recomienda dejar encendido el backend con el comando npm run dev

Posterior a ello vamos a clonar el frontend del proyecto

```
git clone https://github.com/sebasam/frontend-csv-file-uploader.git

npm i

npm start

```

Esperar a que el proyecto cargue e inicie en el navegador, si mantienes el backend encendido podrás realizar las respectivas pruebas.

No fue posible consultar el archivo .csv en una tabla conmo quería, sin embargo el ejercicio finaliza haciendo click en alguno de los archivos que estén visibles
al hacer click obtendrá su ID inmediatamente en el formulario y al oprimir el botoón, podrás visualizar los datos del archivo en la consola del navegador
