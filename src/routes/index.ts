import express, { Request, Response } from 'express';

import isAuth from '../middlewares/isAuth';
import hasRoles from '../middlewares/hasRoles';

const router = express.Router();

router.get('/', (req, res: Response) => {
    res.send('Hello');
})

router.get('/secured', isAuth, hasRoles(['admin', 'student']), (req: Request, res: Response) => {
    res.send('Admin or Student');
})

export default router;  