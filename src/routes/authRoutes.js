import { Router } from 'express'

import {
    getRootController, getLoginController, postLoginController, getLogoutController, getLoginFailedController
} from '../controllers/authController.js'

import passportLogin from '../middlewares/passportLogin.js'

import { webAuthUser } from '../middlewares/auth.js'


const authRouter = new Router();

authRouter.get('/', getRootController);
authRouter.get('/login', getLoginController);
authRouter.post('/login', passportLogin.authenticate('login', {
    failureRedirect: '/loginFailed'
}), postLoginController);
authRouter.get('/logout', webAuthUser, getLogoutController);
authRouter.get('/loginFailed', getLoginFailedController);

export default authRouter