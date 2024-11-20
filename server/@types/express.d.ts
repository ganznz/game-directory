import { Request as ExpressRequest } from "express";
import { ParsedQs } from "qs";

declare global {
    namespace Express {
        interface Request {
            parsedQueryParams?: ParsedQs;
            sanitizedQueryParams?;
        }
    }
}
