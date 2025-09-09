import { Router } from 'express'
import estacaoRoutes from './estacaoRoutes'
import estacaoTipoParametro from './estacaoTipoParametroRoutes'
import tipoParametro from './tipoParametroRoutes'
import valorcapturado from './valorCapturadoRoutes'
import usuarioRoutes from './usuarioRoutes'

const router = Router();

router.use('/usuario', usuarioRoutes)
router.use('/estacao', estacaoRoutes)
router.use('/estacao-tipo-parametro', estacaoTipoParametro)
router.use('/tipo-parametro', tipoParametro)
router.use('/valor-capturado', valorcapturado)

export default router;