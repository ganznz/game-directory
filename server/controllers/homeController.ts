import { Request, Response, NextFunction } from "express";

export const getHome = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get info to display on home page");
};
