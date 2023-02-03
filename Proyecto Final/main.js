import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import config from './src/config/config.js'
import app from './server.js'
import logger from './src/config/logger.js'
import { conectarDB } from './src/classes/dbConexion.js';
import { mensajesDao as mensajesApi } from "./src/models/daos/index.js";

dotenv.config();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

if (cluster.isPrimary && config.MODO === 'CLUSTER') {

    const numCpu = os.cpus().length;

    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        cluster.fork();
    })

} else {

    // configuro el socket

    io.on('connection', async socket => {
        logger.info('Nuevo cliente conectado');

        const mensajes = await mensajesApi.obtenerTodo();

        // historial de mensajes
        socket.emit('mensajes', mensajes);

        socket.on('nuevo-mensaje', async data => {
            await mensajesApi.guardarMensaje(data);
            io.sockets.emit('mensajes', await mensajesApi.obtenerTodo());
        });
    });

    // conexion a base de datos

    conectarDB(config.MONGO_URL, err => {
        if (err) return logger.error('error en conexión de base de datos', err);

        httpServer.listen(config.PORT, (err) => {
            if (err) return logger.error('error en listen server', err);
            logger.info(`Server running on port ${config.PORT}`);
            logger.info(`Modo ${config.MODO}`);
            logger.info(`Ambiente ${config.NODE_ENV}`);
        });
    });
}
