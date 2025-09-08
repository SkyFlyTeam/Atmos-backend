import { Router } from 'express'
import { controllerHello } from '../controllers/helloController'

const routes = Router()

routes.use('/', controllerHello.get_hello)

export default routes