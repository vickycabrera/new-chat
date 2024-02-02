/** CLASE 10 - WEBSOCKETS **/

//Temas de hoy: 

//1) Que es websockets
//2) Socket.io

//1) Websockets es un protocolo de comunicación bidireccional en tiempo real. A diferencia de HTTP, donde el cliente envia una solicitud y el servidor responde, los websockets permiten una comunicación continua y en tiempo real entre el cliente y el servidor. 

//La comunicación se realiza entre dos endpoints, cada enpoint se conoce como socket. 

//¿Cómo funciona? 

//1 Paso -  el cliente tiene que enviar una petición HTTP al servidor y esto se conoce como handshake (apretón de manos). 

//2 Paso - El servidor recibe la peticion y procede a responder el saludo. A esto se le conoce como "abrir la conexión"

//3 Paso - a partir de este momento la cominicació es bidireccional entre el cliente y el servidor. 

//Para poder instalarlo en nuestro programa vamos a ver socket.io. 
//Que es una librería que nos permite comunicarnos con websockets
///////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const PUERTO = 8080; 
const exphbs = require("express-handlebars"); 
const viewsRouter = require("./routes/views.router.js");

//Configuramos handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 


//Middleware
app.use(express.static("./src/public"));

//Routing
app.use("/", viewsRouter);

//Iniciamos el servidor

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})

//Pasos para trabajar con socket.io

//1) Instalamos con npm: npm install socket.io

//2) Importamos el módulo: 
const socket = require("socket.io");


const io = socket(httpServer);

let messages= []

io.on("connection", (socket) => {
    console.log("Un cliente se conectó conmigo");
    
    //No se olviden el nombre del "evento a escuchar", que tiene que ser el mismo desde el cliente al servidor. 
    socket.on("message", (data) => {
        //recibo la data del cliente y lo voy a pushear en el array
        //que declaramos arriba
        messages.push(data)
        io.emit("messagesLogs", messages)
    })
    //Utilizamos el evento "emit" que nos permite emitir eventos
    //desde el servidor al cliente


})


