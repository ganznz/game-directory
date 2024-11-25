import { Request, Response, NextFunction } from "express";
import {
    validateQueryParams,
    sanitizeDevelopersQueryParams,
} from "./middleware.js";

import { DeveloperModel } from "../models/developerModel.js";

const developerModel = new DeveloperModel();
const fetchDevelopers = developerModel.fetchDevelopers;

export const getDevelopers = [
    validateQueryParams,
    sanitizeDevelopersQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const developersData = await fetchDevelopers(
                [
                    "name",
                    "logo.url",
                    "developed.name",
                    "developed.summary",
                    "developed.cover.url",
                ],
                req.sanitizedQueryParams
            );

            res.status(200).send(developersData);
        } catch (err) {
            return next(err);
        }
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
