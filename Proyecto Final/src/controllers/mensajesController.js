import logger from '../config/logger.js'
import mensajesService from '../models/services/mensajeService.js';
import { asDtoMess } from '../classes/mensajesDto.class.js'

const menService = new mensajesService()

async function getChatController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    const usuario = req.session.user;
    if (usuario == 'admin') {
        res.render('messagesAdmin')
    } else {
        res.render('messagesUser', { usuario })
    }
}

async function getChatByEmailController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    const email = req.params.email;
    const mensajes = await menService.obtenerMensajes();
    let mensajesUsuario = [];
    let encontrado = false;

    if (mensajes) {

        mensajes.forEach(elem => {
            if (elem.email == email) {
                mensajesUsuario.push(elem)
                encontrado = true;
            }
        })
        if (encontrado) {
            res.json(asDtoMess(mensajesUsuario));
        } else {
            res.send("No hay mensajes para el usuario solicitado");
        }

    } else {
        res.send("No hay mensajes");
    }

}


export { getChatController, getChatByEmailController }