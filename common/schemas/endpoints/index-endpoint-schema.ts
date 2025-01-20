import { z } from "zod";

const gamesSchema = z.object({
    id: z.number(),
    artworks: z.array(
        z.object({
            id: z.number(),
            url: z.string(),
        })
    ),
    cover: z.object({
        id: z.number(),
        url: z.string(),
    }),
    name: z.string(),
    summary: z.string(),
    total_rating: z.number(),
});

const genreSchema = z.object({
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
    }),
});

const developerSchema = z.object({
    id: z.number(),
    logo: z.object({
        id: z.number(),
        url: z.string(),
    }),
    name: z.string(),
});

export const indexEndpointSchema = z.object({
    gamesData: z.array(gamesSchema),
    genresData: z.array(genreSchema),
    developersData: z.array(developerSchema),
});

export type indexEndpointType = z.infer<typeof indexEndpointSchema>;
