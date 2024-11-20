import qs from "qs";
import { Request, Response, NextFunction } from "express";

import { gamesSanitizedQueryParams } from "../utils/types.js";
import { AppError } from "../utils/errors.js";

export const validateQueryParams = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const parsedParams = qs.parse(req.query as any, {
        ignoreQueryPrefix: true,
    });
    req.parsedQueryParams = parsedParams;
    next();
};

export const sanitizeGamesQueryParams = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const parsedQueryParams = req.parsedQueryParams;
    const sort = parsedQueryParams?.sort;
    const direction = parsedQueryParams?.direction;

    const sanitizedQueryParams: gamesSanitizedQueryParams = {
        sort:
            sort == "name" ||
            sort == "total_rating" ||
            sort == "first_release_date"
                ? sort
                : undefined,
        direction:
            direction == "asc" || direction == "desc" ? direction : "asc",
        limit: (parsedQueryParams?.limit as string) || "50",
        page: (parsedQueryParams?.page as string) || "1",
    };
    req.sanitizedQueryParams = sanitizedQueryParams;

    next();
};

/*
    error handling middleware
*/
export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // handle custom errors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // default server error
    return res.status(500).json({
        status: "fail",
        message: "Something unexpected happened",
    });
};
