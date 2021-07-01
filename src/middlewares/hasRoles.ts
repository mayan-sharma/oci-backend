import { Response, NextFunction } from 'express';

import { userRequest } from '../config/interfaces';

export default function(roles: string[]) {
    return (req: userRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({
                message: 'Forbidden'
            })
        }
        return next();
    }
};