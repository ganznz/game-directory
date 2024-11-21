import { Request, Response, NextFunction } from "express";

import {
    validateQueryParams,
    sanitizeGenresQueryParams,
} from "./middleware.js";
import { GenreModel } from "../models/genreModel.js";

const genreModel = new GenreModel();
const fetchGenres = genreModel.fetchGenres;

export const getGenres = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genresData = await fetchGenres(req.sanitizedQueryParams);
            res.status(200).send(genresData);
        } catch (err) {
            // error is likely propagated up the callstack from fetchGenres method
            return next(err);
        }
    },
];

export const getGenreById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get genre by id");
};
