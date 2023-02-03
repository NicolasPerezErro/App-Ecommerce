import logger from '../config/logger.js'
import enviarMail from '../classes/enviargmail.js'


async function getSignUpController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('signup');
}

async function postSignUpController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    const body = req.body;
    req.session.name = body.name;
    const subject = 'Nuevo registro'
    const htmlInfo = `username: ${body.username},
                      password: ${body.password},
                      name: ${body.name},
                      age: ${body.age},
                      address: ${body.address},
                      phone: ${body.phone}`
    //enviarMail(subject, htmlInfo);
    res.redirect('/');
}

async function getSignUpFailController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('signup-error');
}


export { getSignUpController, postSignUpController, getSignUpFailController }