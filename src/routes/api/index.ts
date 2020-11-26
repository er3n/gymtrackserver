import express, { Router } from 'express';
import echos from './echos';

const router: Router = express.Router();

router.use('/echos', echos);

export default router;
