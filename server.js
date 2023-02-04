import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import config from './src/config/config.js'
import logger from './src/config/logger.js'

const app = express();
const __dirname = process.cwd();

// routes

import productsRouter from './src/routes/productoRoutes.js'
import carritosRouter from './src/routes/carritoRoutes.js'
import authRouter from './src/routes/authRoutes.js'
import registerRouter from './src/routes/registerRoutes.js'
import configRouter from './src/routes/serverRoutes.js'
import chatRouter from './src/routes/mensajesRoutes.js'
import ordenRouter from './src/routes/ordenRoutes.js';


// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/views'));

app.engine('.hbs', handlebars({
    extname: '.hbs', defaultLayout: 'main.hbs', layoutsDir: __dirname + '/src/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(passport.initialize());
app.use(passport.session());

app.use(session(config.mongoSession));

app.use('/', authRouter, registerRouter, configRouter, chatRouter, ordenRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carritos', carritosRouter);

app.use("*", (req, res) => {
    logger.warn(`ruta ${req.url} metodo ${req.method} no implementada`);
    res.status(404).send(
        {
            error: -2,
            descripcion: `ruta ${req.url} metodo ${req.method} no implementada`
        }
    )

});


export default app;