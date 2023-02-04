import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"
import { nombreColeccion, schema } from '../../ordenModel.js'

class OrdenesDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super(nombreColeccion, schema);
    }
}

export default OrdenesDaoMongoDb
