import { Router } from 'express'

import { getChatController, getChatByEmailController } from '../controllers/mensajesController.js'

import { webAuthUser } from '../middlewares/auth.js'

const chatRouter = new Router();

chatRouter.get('/chat', webAuthUser, getChatController);
chatRouter.get('/chat/:email', webAuthUser, getChatByEmailController);

export default chatRouter

