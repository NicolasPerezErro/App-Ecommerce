import config from '../../config/config.js'
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDb.js'
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js'
import UsuariosDaoMongoDB from './usuarios/UsuariosDaoMongoDB.js'
import MensajesDaoMongoDB from './mensajes/MensajesDaoMongoDB.js'
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

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        usuariosDao = new UsuariosDaoMongoDB();
        mensajesDao = new MensajesDaoMongoDB();
        ordenesDao = new OrdenesDaoMongoDb();
        break;
}

export { productosDao, carritosDao, usuariosDao, mensajesDao, ordenesDao }