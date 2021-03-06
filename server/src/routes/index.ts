import { Router } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import auth from './auth';
import user from './user';
import announcement from './announcement';
import ranking from './ranking';
import exam from './exam';
import comment from './comment';
import course from './course';

const router: Router = Router();
const swaggerDocPath = path.join(__dirname, '../config/swagger.yaml');
const swaggerDocument = YAML.load(swaggerDocPath);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', auth);
router.use('/users', user);
router.use('/announcements', announcement);
router.use('/ranking', ranking);
router.use('/exam', exam);
router.use('/comments', comment);
router.use('/courses', course);

export default router;
