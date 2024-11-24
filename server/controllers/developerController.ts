import { Request, Response, NextFunction } from "express";
import { validateQueryParams } from "./middleware.js";

export const getDevelopers = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get developers");
    },
];

export const getDeveloperById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get developer by id");
};

export const getGamesByDeveloper = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get games by developer");
    },
];
