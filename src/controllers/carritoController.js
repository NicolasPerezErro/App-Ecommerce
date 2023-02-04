import carritosService from "../models/services/carritoService.js";
import productosService from "../models/services/productoService.js";
import usuariosService from "../models/services/usuarioService.js";
import ordenesService from "../models/services/ordenService.js";
import { asDtoCarr } from '../classes/carritosDto.class.js'
import { asDtoProdCarrito } from '../classes/productosCarritoDto.class.js'
import enviarMail from "../classes/enviargmail.js";
import logger from '../config/logger.js'

const carrService = new carritosService();
const prodService = new productosService();
const userService = new usuariosService();
const orderService = new ordenesService();

function contadorSession(req) {
    if (req.session.user) {
        req.session.contador++;
    }
}

class carritosController {

    constructor() { }

    async getRootCarritosController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const result = await carrService.obtenerTodosCarritos();
        if (result) {
            res.json(result);
        } else {
            res.json({ error: "No hay carritos" });
        }
    }

    async getProductsCarritoByIdController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const id = req.params.id;
        const result = await carrService.obtenerCarritoPorId(id);
        if (result != null) {
            res.json(asDtoCarr(result));
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async postRootApiController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const usuarios = await userService.obtenerUsuarios();
        let address;
        if (usuarios) {
            usuarios.forEach(user => {
                if (user.username == req.session.user) {
                    address = user.address;
                }
            })
        }
        const body = {};
        const result = await carrService.crearCarrito(body, req.session.user, address);
        res.json(result);
    }

    async postProductsCarritoByIdController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const idCarrito = req.params.id_carrito;
        const idProd = req.params.id_prod;
        const resultProd = await prodService.obtenerProductoPorId(idProd);
        const resultCarr = await carrService.obtenerCarritoPorId(idCarrito);
        if (resultCarr != null) {
            if (resultProd != null) {
                await carrService.insertarProdEnCarrito(asDtoProdCarrito(resultProd[0]), idCarrito);
                res.json({ result: "producto añadido al carrito" });
            } else {
                res.json({ error: "producto no encontrado" });
            }
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async deleteCarritoByIdController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const id = req.params.id;
        const result = await carrService.obtenerCarritoPorId(id);
        if (result != null) {
            await carrService.borrarCarritoPorId(id);
            res.json({ result: "carrito eliminado" });
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async deleteProductsCarritoByIdController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const idCarrito = req.params.id_carrito;
        const idProd = req.params.id_prod;
        const resultProd = await prodService.obtenerProductoPorId(idProd);
        const resultCarr = await carrService.obtenerCarritoPorId(idCarrito);
        if (resultCarr != null) {
            if (resultProd != null) {
                await carrService.borrarProdDeCarrito(idProd, idCarrito);
                res.json({ result: "producto borrado del carrito" });
            } else {
                res.json({ error: "producto no encontrado" });
            }
        } else {
            res.json({ error: "carrito no encontrado" });
        }
    }

    async postSendCarritoMailController(req, res) {
        logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
        contadorSession(req)
        const idCarrito = req.params.id_carrito;
        const carrito = await carrService.obtenerCarritoPorId(idCarrito);
        if (carrito[0].productos.length > 0) {
            let htmlInfo = '';
            let total = 0;
            carrito[0].productos.forEach((prod) => {
                htmlInfo += `${prod.title} X${prod.amount} $${prod.price * prod.amount} | `
                total += prod.price * prod.amount
            })
            const orden = await orderService.generarOrden(htmlInfo, req.session.user);
            if (orden) {
                enviarMail(`Nuevo pedido. Orden numero #${orden}`, `Lista de productos: ${htmlInfo}\n-------------------->\nMonto final: $${total}`);
                await carrService.borrarCarritoPorId(idCarrito);
                res.json({ result: "orden generada" });
            } else {
                res.send({ error: "no se pudo generar la orden" })
            }

        } else {
            res.json({ error: "carrito no encontrado" });
        }

    }
}

export default carritosController