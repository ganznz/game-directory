import { Request, Response, NextFunction } from "express";
import { validateQueryParams } from "./middleware.js";

export const getGenres = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get genres");
    },
];

export const getGenreById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get genre by id");
};
