import ordenesService from "../models/services/ordenService.js";
import logger from '../config/logger.js'

const orderService = new ordenesService();

function contadorSession(req) {
    if (req.session.user) {
        req.session.contador++;
    }
}

async function getOrderController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    contadorSession(req);
    const result = await orderService.obtenerOrdenes();
    res.json(result)
}

export default getOrderController