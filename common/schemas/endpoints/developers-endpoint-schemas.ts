import { z } from "zod";

/**
 * Helper schema for developed game data containing basic game information.
 */
const developedGameSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        summary: z.string().optional(),
        cover: z.object({
            id: z.number(),
            url: z.string(),
        }),
    })
);

/**
 * Helper schema for logos containing basic logo information.
 */
const logoSchema = z.object({
    id: z.number(),
    url: z.string(),
});

/**
 * Schema for the ``GET /developers`` endpoint response.
 * Represents an array of developers with their basic information and the games they have developed.
 * @example
 * [
 *   {
 *     id: 1,
 *     logo: { id: 1, url: "https://..." },
 *     developed: [
 *       {
 *         id: 123,
 *         name: "Game Title",
 *         summary: "Game description...",
 *         cover: { id: 1, url: "https://..." }
 *       }
 *     ]
 *   }
 * ]
 */
export const getDevelopersEndpointSchema = z.array(
    z.object({
        id: z.number(),
        logo: logoSchema,
        developed: developedGameSchema,
    })
);

/** Type definition for the ``GET /developers`` endpoint response */
export type getDevelopersEndpointType = z.infer<
    typeof getDevelopersEndpointSchema
>;

export const getDeveloperByIdEndpointSchema = z.object({
    id: z.number(),
    name: z.string(),
    country: z.number(),
    description: z.number(),
    developed: developedGameSchema,
    logo: logoSchema,
    websites: z
        .array(
            z.object({
                id: z.number(),
                category: z.number(),
                url: z.string(),
            })
        )
        .optional(),
});

export type getDeveloperByIdEndpointType = z.infer<
    typeof getDeveloperByIdEndpointSchema
>;

/**
 * Schema for the ``GET /developers/:id/games`` endpoint response.
 * Represents an array of games developed by a specific developer.
 * @example
 * [
 *   {
 *     id: 123,
 *     name: "Game Title",
 *     summary: "Game description...",
 *     total_rating: 85.5,
 *     cover: { id: 1, url: "https://..." },
 *     genres: [{ id: 1, name: "Action" }],
 *     artworks: [{ id: 1, url: "https://..." }]
 *   }
 * ]
 */
export const getGamesByDeveloperEndpointSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        summary: z.string().optional(),
        total_rating: z.number(),
        cover: z.object({
            id: z.number(),
            url: z.string(),
        }),
        genres: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        ),
        artworks: z
            .array(
                z.object({
                    id: z.number(),
                    url: z.string(),
                })
            )
            .optional(),
    })
);

/** Type definition for the ``GET /developers/:id/games`` endpoint response */
export type getGamesByDeveloperEndpointType = z.infer<
    typeof getGamesByDeveloperEndpointSchema
>;
