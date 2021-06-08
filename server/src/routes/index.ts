import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import auth from './auth';
import user from './user';

const router: Router = Router();
const swaggerDocument = YAML.load(`${__dirname}/swagger.yaml`);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', auth);
router.use('/users', user);

export default router;
