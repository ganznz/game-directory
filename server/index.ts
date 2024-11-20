// load server env vars before anything else
import "./config/init.js";

import express from "express";
import { Response, Request } from "express";

import { homeRouter } from "./routes/homeRouter.js";
import { gameRouter } from "./routes/gameRouter.js";
import { genreRouter } from "./routes/genreRouter.js";
import { companyRouter } from "./routes/companyRouter.js";

const PORT = 8080;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api/home", homeRouter);
app.use("/api/games", gameRouter);
app.use("/api/genres", genreRouter);
app.use("/api/companies", companyRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// error handling middleware
app.use((err: Error, _req: Request, _res: Response) => {
    console.error(err);
});
