import productosService from "../models/services/productoService.js";
import { asDtoProd } from '../classes/productosDto.class.js'

const prodService = new productosService();

function contadorSession(req) {
    if (req.session.user) {
        req.session.contador++;
    }
}

class productosController {

    constructor() { }

    async getProductsByIdController(req, res) {
        contadorSession(req);
        const id = req.params.id;
        const result = await prodService.obtenerProductoPorId(id);
        if (result) {
            res.json(asDtoProd(result[0]));
        } else {
            res.json(null);
        }

    }

    async getRootProductsController(req, res) {
        contadorSession(req);
        const result = await prodService.obtenerTodoProductos();
        if (result) {
            res.json(asDtoProd(result));
        } else {
            res.json(null);
        }

    }

    async postRootProductsController(req, res) {
        contadorSession(req);
        const body = req.body;
        const result = await prodService.guardarProducto(body);
        res.json(result)
    }

    async putProductsByIdController(req, res) {
        contadorSession(req);
        const body = req.body;
        const id = req.params.id;
        const result = await prodService.actualizarProducto(body, id);
        res.send(result);
    }

    async deleteProductsByIdController(req, res) {
        contadorSession(req);
        const id = req.params.id;
        const result = await prodService.borrarProductoPorId(id);
        if (result) {
            res.json(asDtoProd(result));
        } else {
            res.json(null)
        }

    }

    async getProductsByCategory(req, res) {
        contadorSession(req);
        const category = req.params.category;
        const result = await prodService.obtenerProductosPorCategoria(category);
        if (result) {
            res.json(asDtoProd(result));
        } else {
            res.json(null)
        }
    }

}

export default productosController