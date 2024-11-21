import { Request, Response, NextFunction } from "express";

import { validateQueryParams, sanitizeGamesQueryParams } from "./middleware.js";
import { GameModel } from "../models/gameModel.js";

const gameModel = new GameModel();
const fetchGames = gameModel.fetchGames;
const fetchGameById = gameModel.fetchGameById;

export const getGames = [
    validateQueryParams,
    sanitizeGamesQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gamesData = await fetchGames(req.sanitizedQueryParams);
            res.status(200).send(gamesData);
        } catch (err) {
            // error is likely propagated up the callstack from fetchGames method
            return next(err);
        }
    },
];

export const getGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const gameData = await fetchGameById(req.params.id);
        res.status(200).send(gameData);
    } catch (err) {
        // error is likely propagated up the callstack from fetchGameById method
        return next(err);
    }
};

export const getGamesByGenre = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get games by genre");
    },
];
