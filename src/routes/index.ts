import { Router } from 'express'
import helloRoutes from '../routes/helloRoutes'
import usuarioRoutes from '../routes/usuarioRoutes'

const router = Router();

router.use('/hello', helloRoutes)
router.use('/usuario', usuarioRoutes)

export default router;