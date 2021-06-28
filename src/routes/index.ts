import express, { Request, Response } from 'express';

import isAuth from '../middlewares/isAuth';

const router = express.Router();

router.get('/', isAuth, (req: Request, res: Response) => {
    res.send('Hello');
})

export default router;