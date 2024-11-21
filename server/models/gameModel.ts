import { igdbApiClient } from "../services/igdb.js";
import { gamesSanitizedQueryParams } from "../utils/types.js";

import { createBadRequestError } from "../utils/errors.js";

export class GameModel {
    constructor() {}
    fetchGames = async (opts: gamesSanitizedQueryParams) => {
        try {
            const limit = opts.limit;
            const page = opts.page;
            const sortBy = opts.sort;
            const sortDirection = opts.direction;

            const reqBody = `
                fields name, total_rating, cover.url;
                where category = 0 & total_rating != null & cover.url != null;
                limit ${limit};
                sort ${sortBy} ${sortDirection};
                offset ${(parseInt(page) - 1) * parseInt(limit)};
            `;

            const res = await igdbApiClient.post("/games", reqBody);
            return res.data;
        } catch (err) {
            throw createBadRequestError("Invalid filter options");
        }
    };

    fetchGameById = async (id: string) => {
        try {
            const reqBody = `
                fields name, summary, storyline, total_rating_count, alternative_names.name, artworks.url, dlcs.name,
                first_release_date, franchise.name, game_engines.name, genres.name, involved_companies.developer,
                involved_companies.publisher, involved_companies.company.name, involved_companies.company.description,
                involved_companies.company.logo, involved_companies.company.start_date, involved_companies.company.websites.url, websites.url;
                where id = ${id};
            `;

            const res = await igdbApiClient.post("/games", reqBody);
            return res.data;
        } catch (err) {
            throw createBadRequestError("Invalid game ID");
        }
    };
}
