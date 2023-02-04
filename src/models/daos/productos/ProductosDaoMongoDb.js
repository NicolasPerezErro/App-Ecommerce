import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"
import { nombreColeccion, schema } from '../../productoModel.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super(nombreColeccion, schema);
    }
}

export default ProductosDaoMongoDb
