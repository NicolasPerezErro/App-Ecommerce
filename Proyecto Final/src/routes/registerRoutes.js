import { Router } from 'express'

import {
    getSignUpController, postSignUpController, getSignUpFailController
} from '../controllers/registerController.js'

import passportRegister from '../middlewares/passportRegister.js'

const registerRouter = new Router();


registerRouter.get('/signup', getSignUpController);
registerRouter.post('/signup', passportRegister.authenticate('signup', {
    failureRedirect: '/signupFail'
}), postSignUpController);
registerRouter.get('/signupFail', getSignUpFailController);

export default registerRouter