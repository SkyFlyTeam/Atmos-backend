import { Router } from 'express'
import estacaoRoutes from './estacaoRoutes'

const router = Router();

router.use('/estacao', estacaoRoutes)

export default router;