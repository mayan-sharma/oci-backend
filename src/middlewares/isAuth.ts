import { Request, Response, NextFunction } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({
            message: 'Access Denied!'
        })
    }

    return next();
};