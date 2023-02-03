import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"
import { nombreColeccion, schema } from "../../mensajeModel.js"

class MensajesDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super(nombreColeccion, schema);
    }
}

export default MensajesDaoMongoDb