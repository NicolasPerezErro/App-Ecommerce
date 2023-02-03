import { Router } from 'express'

import getConfigController from '../controllers/configController.js'

import { webAuthAdmin } from '../middlewares/auth.js'


const configRouter = new Router();

configRouter.get('/config', webAuthAdmin, getConfigController);

export default configRouter