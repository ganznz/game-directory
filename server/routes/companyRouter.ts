import { Router } from "express";

import {
    getCompanies,
    getCompanyById,
    getGamesByCompany,
} from "../controllers/companyController.js";

export const companyRouter = Router();

companyRouter.get("/", getCompanies);
companyRouter.get("/:id", getCompanyById);
companyRouter.get("/:id/games", getGamesByCompany);
