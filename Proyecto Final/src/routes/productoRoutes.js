import { Router } from 'express'

import productosController from '../controllers/productoController.js'

import { webAuthUser, webAuthAdmin } from '../middlewares/auth.js'

const productsRouter = new Router();

const productos = new productosController();

productsRouter.get('/', webAuthUser, productos.getRootProductsController);
productsRouter.get('/:id', webAuthUser, productos.getProductsByIdController);
productsRouter.get('/categoria/:category', webAuthUser, productos.getProductsByCategory);
productsRouter.post('/', webAuthAdmin, productos.postRootProductsController);
productsRouter.put('/:id', webAuthAdmin, productos.putProductsByIdController);
productsRouter.delete('/:id', webAuthAdmin, productos.deleteProductsByIdController);

export default productsRouter