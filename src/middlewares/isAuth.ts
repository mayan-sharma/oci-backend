import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { userRequest } from '../config/interfaces';
import config from '../config/config';

export default function(req: userRequest, res: Response, next: NextFunction) {
    const headerString = req.header('Authorization');
    const token = headerString?.split(' ')[1] || null;

    if (!token) {
        return res.status(401).send({
            message: 'Access Denied!'
        });
    }

    try {
        const payload = jwt.verify(token, config.SECRET);
        req.user = payload;
        return next();

    } catch(err) {
        console.error(err);
        return res.status(400).send({
            message: 'Invalid Token!',
        });      
    }
};