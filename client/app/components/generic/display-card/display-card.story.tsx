import type { Meta, StoryObj } from "@storybook/react";
import { DisplayCard } from "./display-card";

const meta: Meta<typeof DisplayCard> = {
    component: DisplayCard,
};

export default meta;

type Story = StoryObj<typeof DisplayCard>;

export const GameDisplayCard: Story = {
    args: {
        data: {
            name: "Grand Theft Auto V",
            summary:
                "Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.",
            totalRating: 88.82340084306142,
            cover: {
                url: "//images.igdb.com/igdb/image/upload/t_1080p/co2lbd.jpg",
            },
        },
    },
};

export const GenreDisplayCard: Story = {
    args: {
        data: {
            name: "Action",
            gameDetails: {
                name: "Grand Theft Auto V",
                cover: {
                    url: "//images.igdb.com/igdb/image/upload/t_1080p/co2lbd.jpg",
                },
                summary:
                    "Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.",
                totalRating: 88.82340084306142,
            },
        },
    },
};
export const DeveloperDisplayCard: Story = {
    args: {
        data: {
            name: "Rockstar Games",
            logo: {
                url: "//images.igdb.com/igdb/image/upload/t_1080p/cl8g0.jpg",
            },
        },
    },
};
