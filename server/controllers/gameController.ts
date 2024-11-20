import { Request, Response, NextFunction } from "express";
import { validateQueryParams } from "./middleware.js";

export const getGames = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get games");
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
