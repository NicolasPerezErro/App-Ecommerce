import config from '../../config/config.js'

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
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB.js')
        const { default: CarritosDaoMongoDB } = await import('./carritos/CarritosDaoMongoDB.js')
        const { default: UsuariosDaoMongoDB } = await import('./usuarios/UsuariosDaoMongoDB.js')
        const { default: MensajesDaoMongoDB } = await import('./mensajes/MensajesDaoMongoDB.js')
        const { default: OrdenesDaoMongoDb } = await import('./ordenes/OrdenesDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        usuariosDao = new UsuariosDaoMongoDB();
        mensajesDao = new MensajesDaoMongoDB();
        ordenesDao = new OrdenesDaoMongoDb();
        break;
}

export { productosDao, carritosDao, usuariosDao, mensajesDao, ordenesDao }