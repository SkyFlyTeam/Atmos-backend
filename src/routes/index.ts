import { Router } from 'express'
import usuarioRoutes from '../routes/usuarioRoutes'

const router = Router();

router.use('/usuario', usuarioRoutes)

export default router;