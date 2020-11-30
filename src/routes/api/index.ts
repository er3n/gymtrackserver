import express, { Router } from 'express';
import echos from './echos';
import passwordLogin from './passwordLogin';

const router: Router = express.Router();

router.use('/echos', echos);
router.use('/password-logins', passwordLogin);

export default router;
