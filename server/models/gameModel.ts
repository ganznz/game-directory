import { igdbApiClient } from "../services/igdb.js";
import { gamesSanitizedQueryParams } from "../utils/types.js";

import { createBadRequestError } from "../utils/errors.js";

export class GameModel {
    constructor() {}
    fetchGames = async (fields: string[], opts: gamesSanitizedQueryParams) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where category = 0 & total_rating != null & cover.url != null;
                limit ${opts.limit};
                sort ${opts.sort} ${opts.direction};
                offset ${(parseInt(opts.page) - 1) * parseInt(opts.limit)};
            `;

            const res = await igdbApiClient.post("/games", reqBody);
            return res.data;
        } catch (err) {
            throw createBadRequestError("Invalid filter options");
        }
    };

    fetchGameById = async (id: string, fields: string[]) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where id = ${id};
            `;

            const res = await igdbApiClient.post("/games", reqBody);
            return res.data;
        } catch (err) {
            throw createBadRequestError("Invalid game ID");
        }
    };
}
