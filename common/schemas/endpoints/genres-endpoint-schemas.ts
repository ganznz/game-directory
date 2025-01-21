import { z } from "zod";

/**
 * Helper schema for a game within a genre.
 * Includes basic game information such as name, summary and artworks.
 */
const gameInGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    summary: z.string().optional(),
    total_rating: z.number(),
    artworks: z
        .array(
            z.object({
                id: z.number(),
                url: z.string(),
            })
        )
        .optional(),
    cover: z.object({
        id: z.number(),
        url: z.string(),
    }),
});

/**
 * Helper schema for a developer within a genre.
 * Contains basic developer information such as name and logo.
 */
const developersInGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    logo: z
        .object({
            id: z.number(),
            url: z.string(),
        })
        .optional(),
});

/**
 * Schema for the ``GET /genres`` endpoint response.
 * Genre information with an included reference game for each genre.
 * @example
 */
export const getGenresEndpointSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        gameDetails: z.object({
            id: z.number(),
            cover: z.object({
                id: z.number(),
                url: z.string(),
            }),
            genres: z.array(z.number()),
            name: z.string(),
            summary: z.string(),
            total_rating: z.number(),
            artworks: z
                .array(
                    z.object({
                        id: z.number(),
                        url: z.string(),
                    })
                )
                .optional(),
        }),
    })
);

/** Type definition for the ``GET /genres`` endpoint response */
export type getGenresEndpointType = z.infer<typeof getGenresEndpointSchema>;

/**
 * Schema for the ``GET /genres/:id`` endpoint response.
 * Represents detailed information about a specific genre.
 * @example
 */
export const getGenreByIdEndpointSchema = z.object({
    genre: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ),
    gamesInGenre: z.array(gameInGenreSchema),
    developersInGenre: z.array(developersInGenreSchema),
});

/** Type definition for the ``GET /genres/:id`` endpoint response */
export type getGenreByIdEndpointType = z.infer<
    typeof getGenreByIdEndpointSchema
>;

/**
 * Schema for the ``GET /genres/:id/games`` endpoint response.
 * Contains detailed information about games within a specific genre.
 * @example
 */
export const getGamesByGenreEndpointSchema = z.array(
    gameInGenreSchema.extend({
        genres: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        ),
    })
);

/** Type definition for the ``GET /genres/:id/games`` endpoint response */
export type getGamesByGenreEndpointType = z.infer<
    typeof getGamesByGenreEndpointSchema
>;

/**
 * Schema for the ``GET /genres/:id/developers`` endpoint response.
 * Contains detailed information about developers within a specific genre.
 * @example
 */
export const getDevelopersByGenreEndpointSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
        logo: z.object({
            id: z.number(),
            url: z.string(),
        }),
        developed: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                artworks: z
                    .array(
                        z.object({
                            id: z.number(),
                            url: z.string(),
                        })
                    )
                    .optional(),
            })
        ),
    })
);
