import { Router } from 'express'
import helloRoutes from '../routes/helloRoutes'
import estacaoRoutes from './estacaoRoutes'

const router = Router();

router.use('/hello', helloRoutes)
router.use('/estacao', estacaoRoutes)

export default router;