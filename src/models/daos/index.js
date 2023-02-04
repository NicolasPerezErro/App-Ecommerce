import config from '../../config/config.js'

import ProductosDaoMongoDb from './productos/ProductosDaoMongoDb.js'
import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb.js'
import UsuariosDaoMongoDb from './usuarios/UsuariosDaoMongoDb.js'
import MensajesDaoMongoDb from './mensajes/MensajesDaoMongoDb.js'
import OrdenesDaoMongoDb from './ordenes/OrdenesDaoMongoDb.js'

let productosDao
let carritosDao
let usuariosDao
let mensajesDao
let ordenesDao

switch (config.PERS) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    case 'mongodb':

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        usuariosDao = new UsuariosDaoMongoDb();
        mensajesDao = new MensajesDaoMongoDb();
        ordenesDao = new OrdenesDaoMongoDb();
        break;
}

export { productosDao, carritosDao, usuariosDao, mensajesDao, ordenesDao }