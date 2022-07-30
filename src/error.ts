import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status).send(err.message);
};

export default errorMiddleware;
