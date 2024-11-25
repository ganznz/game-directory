import { createBadRequestError } from "../utils/errors.js";
import { developersSanitizedQueryParams } from "../utils/types.js";
import { igdbApiClient } from "../services/igdb.js";

export class DeveloperModel {
    constructor() {}
    fetchDevelopers = async (
        fields: string[],
        opts: developersSanitizedQueryParams
    ) => {
        try {
            const developersReqBody = `
                fields ${fields.join(",")};
                where developed != null & logo.url != null;
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
                offset ${(parseInt(opts.page) - 1) * parseInt(opts.limit)};
            `;
            const developersRes = await igdbApiClient.post(
                "/companies",
                developersReqBody
            );

            return developersRes.data;
        } catch (err) {
            throw createBadRequestError("Unable to fetch developer data");
        }
    };
}
