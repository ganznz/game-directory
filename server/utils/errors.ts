export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// helper funcs
export const createBadRequestError = (msg: string) => new AppError(msg, 400);
export const createUnauthorizedError = (msg: string) => new AppError(msg, 401);
export const createNotFoundError = (msg: string) => new AppError(msg, 404);
export const createServerError = (msg: string) => new AppError(msg, 500);
