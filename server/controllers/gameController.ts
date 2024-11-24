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
            const gamesData = await fetchGames(
                [
                    "name",
                    "total_rating",
                    "cover.url",
                    "summary",
                    "artworks.url",
                    "franchise.name",
                ],
                req.sanitizedQueryParams
            );
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
        const gameData = await fetchGameById(req.params.id, [
            "name",
            "summary",
            "storyline",
            "total_rating",
            "alternative_names.name",
            "artworks.url",
            "dlcs.name",
            "dlcs.summary",
            "dlcs.total_rating",
            "dlcs.artworks.url",
            "first_release_date",
            "franchise.name",
            "game_engines.name",
            "genres.name",
            "involved_companies.developer",
            "involved_companies.publisher",
            "involved_companies.company.name",
            "involved_companies.company.description",
            "involved_companies.company.logo",
            "involved_companies.company.logo.url",
            "involved_companies.company.start_date",
            "involved_companies.company.websites.url",
            "websites.url",
        ]);
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
