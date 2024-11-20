import { Request, Response, NextFunction } from "express";

import { validateQueryParams, sanitizeGamesQueryParams } from "./middleware.js";
import { GameModel } from "../models/gameModel.js";
import { AppError, createBadRequestError } from "../utils/errors.js";

const gameModel = new GameModel();
const fetchGames = gameModel.fetchGames;

export const getGames = [
    validateQueryParams,
    sanitizeGamesQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameData = await fetchGames(req.sanitizedQueryParams);
            res.status(200).send(gameData);
        } catch (err) {
            // error is likely propogated up from callstack from fetchGames function
            return next(err);
        }
    },
];

export const getGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get game by id");
};

export const getGamesByGenre = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get games by genre");
    },
];
