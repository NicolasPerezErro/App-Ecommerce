import ContenedorMongoDb from "../../repositories/ContenedorMongoDb.js"
import { nombreColeccion, schema } from "../../carritoModel.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super(nombreColeccion, schema);
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongoDb