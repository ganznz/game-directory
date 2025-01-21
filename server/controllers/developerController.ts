import { Request, Response, NextFunction } from "express";

import {
    validateQueryParams,
    sanitizeDevelopersQueryParams,
} from "./middleware.js";
import { DeveloperModel } from "../models/developerModel.js";
import {
    gamesSanitizedQueryParams,
    developersSanitizedQueryParams,
} from "../utils/types.js";

const developerModel = new DeveloperModel();
const fetchDevelopers = developerModel.fetchDevelopers;
const fetchDeveloperByIDs = developerModel.fetchDeveloperByIDs;
const fetchGamesByDeveloperIDs = developerModel.fetchGamesByDeveloperIDs;

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
                req.sanitizedQueryParams as developersSanitizedQueryParams
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
    try {
        const developerData = await fetchDeveloperByIDs(
            [req.params.id],
            [
                "name",
                "description",
                "country",
                "logo.url",
                "developed.name",
                "developed.summary",
                "developed.cover.url",
                "websites.category",
                "websites.url",
            ]
        );

        res.status(200).send(developerData);
    } catch (err) {
        return next(err);
    }
};

export const getGamesByDeveloper = [
    validateQueryParams,
    sanitizeDevelopersQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gamesData = await fetchGamesByDeveloperIDs(
                [req.params.id],
                [
                    "name",
                    "genres.name",
                    "total_rating",
                    "cover.url",
                    "summary",
                    "artworks.url",
                ],
                req.sanitizedQueryParams as gamesSanitizedQueryParams
            );

            res.status(200).send(gamesData);
        } catch (err) {
            return next(err);
        }
    },
];
