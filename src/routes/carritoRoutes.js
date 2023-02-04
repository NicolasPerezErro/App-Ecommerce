import { Router } from 'express'

import carritoController from '../controllers/carritoController.js'

import { webAuthUser, webAuthAdmin } from '../middlewares/auth.js'

const carritosRouter = new Router();

const carritos = new carritoController();

carritosRouter.get('/:id/productos', webAuthUser, carritos.getProductsCarritoByIdController);
carritosRouter.get('/', webAuthAdmin, carritos.getRootCarritosController);
carritosRouter.post('/', webAuthUser, carritos.postRootApiController);
carritosRouter.post('/:id_carrito/productos/:id_prod', webAuthUser, carritos.postProductsCarritoByIdController);
carritosRouter.delete('/:id', webAuthUser, carritos.deleteCarritoByIdController);
carritosRouter.delete('/:id_carrito/productos/:id_prod', webAuthUser, carritos.deleteProductsCarritoByIdController);
carritosRouter.post('/enviarPedido/:id_carrito', webAuthUser, carritos.postSendCarritoMailController);

export default carritosRouter