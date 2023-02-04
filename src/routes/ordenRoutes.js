import { Router } from 'express'

import getOrderController from '../controllers/ordenController.js'

import { webAuthAdmin } from '../middlewares/auth.js'

const ordenRouter = new Router();

ordenRouter.get('/ordenes', webAuthAdmin, getOrderController);

export default ordenRouter