import { createBadRequestError } from "../utils/errors.js";
import {
    developersSanitizedQueryParams,
    gamesSanitizedQueryParams,
} from "../utils/types.js";
import { igdbApiClient } from "../services/igdb.js";

export class DeveloperModel {
    constructor() {}
    fetchDevelopers = async (
        fields: string[],
        opts: developersSanitizedQueryParams
    ) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where developed != null & logo.url != null;
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
                offset ${(parseInt(opts.page) - 1) * parseInt(opts.limit)};
            `;
            const res = await igdbApiClient.post("/companies", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Unable to fetch developer data");
        }
    };

    fetchDeveloperByIDs = async (companyIds: string[], fields: string[]) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where developed != null & logo.url != null;
                where id = (${companyIds.join(",")});
            `;
            const res = await igdbApiClient.post("/companies", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError(
                "Unable to fetch developers with specified ID(s)"
            );
        }
    };

    fetchGamesByDeveloperIDs = async (
        companyIds: string[],
        fields: string[],
        opts: gamesSanitizedQueryParams
    ) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where involved_companies.company = (${companyIds.join(
                    ","
                )}) & cover.url != null;
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
            `;
            const res = await igdbApiClient.post("/games", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError(
                "Unable to fetch games by specified developer ID(s)"
            );
        }
    };
}
