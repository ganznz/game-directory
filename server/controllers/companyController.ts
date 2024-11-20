import { Request, Response, NextFunction } from "express";
import { validateQueryParams } from "./middleware.js";

export const getCompanies = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get companies");
    },
];

export const getCompanyById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get company by id");
};

export const getGamesByCompany = [
    validateQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("get games by company");
    },
];
