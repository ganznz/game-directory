import { Router } from "express";
import { getHomeData } from "../controllers/homeController.js";

export const homeRouter = Router();

homeRouter.get("/", getHomeData);
