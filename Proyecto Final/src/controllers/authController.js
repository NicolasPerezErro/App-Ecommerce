import logger from '../config/logger.js'

async function getRootController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('login')
}

async function getLoginController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('login')
}

async function postLoginController(req, res) {
    const body = req.body;
    req.session.user = body.username;
    req.session.contador = 0;
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.redirect('/api/productos');
}

async function getLogoutController(req, res) {
    const nombre = req.session.user;
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.render('logout', { nombre });
        }
    })
}

async function getLoginFailedController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('login-error');
}

export {
    getRootController, getLoginController, postLoginController, getLogoutController, getLoginFailedController
}