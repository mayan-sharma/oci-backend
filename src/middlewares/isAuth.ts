import { Response, NextFunction } from 'express';

import { userRequest } from '../config/interfaces';

export default function(req: userRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({
            message: 'Access Denied!'
        })
    }

    req.user = {
        name: 'John',
        role: 'admin'
    }

    return next();
};