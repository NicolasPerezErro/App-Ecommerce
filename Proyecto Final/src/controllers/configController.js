import logger from '../config/logger.js'
import config from '../config/config.js'


async function getConfigController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('config', {config});
}

export default getConfigController