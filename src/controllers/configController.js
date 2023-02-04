import logger from '../config/logger.js'
import config from '../config/config.js'

function contadorSession(req) {
    if (req.session.user) {
        req.session.contador++;
    }
}

async function getConfigController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    contadorSession(req);
    res.render('config', { config });
}

export default getConfigController