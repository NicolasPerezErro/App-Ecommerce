import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"
import { nombreColeccion, schema } from '../../userModel.js'

class UsuariosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super(nombreColeccion, schema)
    }
}

export default UsuariosDaoMongoDb
