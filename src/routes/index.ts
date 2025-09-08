import { Router } from 'express'
import helloRoutes from '../routes/helloRoutes'

const router = Router();

router.use('/hello', helloRoutes)

export default router;