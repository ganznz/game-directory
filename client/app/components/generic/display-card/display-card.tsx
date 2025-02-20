import { useRef, useState } from "react";
import { Button } from "../button/button";
import { NavLink } from "react-router";

interface gameData {
    name: string;
    summary: string;
    totalRating: number;
    cover: { url: string };
}

interface genreData {
    name: string;
    gameDetails: {
        name: string;
        cover: { url: string };
        summary: string;
        totalRating: number;
    };
}

interface developerData {
    name: string;
    logo: { url: string };
}

interface IDisplayCard {
    data: gameData | genreData | developerData;
    loading?: boolean;
    opts?: {
        expandedBacksplash?: boolean;
        expandedBacksplashColourLight?: string; // hex colour
        expandedBacksplashColourDark?: string; // hex colour
    };
}

const isGameData = (
    data: gameData | genreData | developerData
): data is gameData => {
    return (data as gameData).totalRating !== undefined;
};

const isGenreData = (
    data: gameData | genreData | developerData
): data is genreData => {
    return (data as genreData).gameDetails !== undefined;
};

const isDeveloperData = (
    data: gameData | genreData | developerData
): data is developerData => {
    return (data as developerData).logo !== undefined;
};

export const DisplayCard = ({ data, opts, loading }: IDisplayCard) => {
    const [expandedCard, setExpandedCard] = useState(false);
    const [initialHoverUsed, setInitialHoverUsed] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    let imageUrl: string;
    let summaryText: string | undefined;

    switch (true) {
        case isGameData(data):
            imageUrl = data.cover.url;
            summaryText = data.summary.substring(0, 150) + "...";
            break;
        case isGenreData(data):
            imageUrl = data.gameDetails.cover.url;
            summaryText = data.gameDetails.summary.substring(0, 150) + "...";
            break;
        case isDeveloperData(data):
            imageUrl = data.logo.url;
            summaryText = undefined; // no summary for developer data
            break;
        default:
            imageUrl = "/";
            summaryText = undefined;
            break;
    }

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                setExpandedCard(false);
            }, 100);
        }
        setInitialHoverUsed(false);
    };

    return (
        <>
            <div className="bg-transparent relative md:min-w-2xs md:max-w-sm">
                <div
                    className={`md:min-w-2xs md:max-w-sm flex flex-col relative bg-light-bg dark:bg-dark-bg rounded-md shadow-md overflow-hidden ${
                        expandedCard ? "overflow-scroll z-100 p-5" : ""
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
                    onMouseOver={() => {
                        if (!loading) {
                            !initialHoverUsed && setExpandedCard(true);
                            setInitialHoverUsed(true);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!loading) {
                            handleMouseLeave();
                        }
                    }}
                    onMouseDown={() =>
                        !loading && setExpandedCard(!expandedCard)
                    }
                    ref={cardRef}
                >
                    {loading ? (
                        // Skeleton loading state
                        <div className="p-3">
                            <div className="h-48 bg-light-skeleton-loading dark:bg-dark-skeleton-loading animate-pulse rounded-md"></div>
                            <h3 className="text-lg text-center mt-4 font-semibold bg-light-skeleton-loading dark:bg-dark-skeleton-loading animate-pulse h-6 w-3/4 mx-auto rounded-md"></h3>
                            <p className="max-h-0 opacity-0 bg-light-skeleton-loading dark:bg-dark-skeleton-loading animate-pulse h-4 w-5/6 mx-auto rounded-md"></p>
                        </div>
                    ) : (
                        <>
                            <img
                                src={imageUrl}
                                alt={`${data.name} cover artwork`}
                                className={`h-48 overflow-hidden object-cover -z-10 opacity-80 ${
                                    expandedCard ? "rounded-md opacity-100" : ""
                                } transition-all duration-300 ease-in-out`}
                            />

                            <h3
                                className={`text-lg text-center mt-4 font-semibold z-10`}
                            >
                                {data.name}
                            </h3>

                            {isGenreData(data) && (
                                <p
                                    className={`text-gray-600 dark:text-gray-300 italic max-h-0 opacity-0 ${
                                        expandedCard
                                            ? "max-h-40 opacity-100 mt-4"
                                            : "overflow-hidden"
                                    } transition-all duration-300 ease-in-out`}
                                >
                                    <span className="font-bold text-blue-500 dark:text-green-400">
                                        {data.gameDetails.name}
                                    </span>
                                    {` features in this genre.`}
                                </p>
                            )}

                            {/* summary text visible only when card expanded */}
                            {summaryText && (
                                <p
                                    className={`text-gray-600 dark:text-gray-300 italic max-h-0 opacity-0 ${
                                        expandedCard
                                            ? "max-h-40 opacity-100"
                                            : "overflow-hidden"
                                    } transition-all duration-300 ease-in-out ${
                                        isGenreData(data) ? "mt-2" : "mt-4"
                                    }`}
                                >
                                    {summaryText}
                                </p>
                            )}

                            <NavLink
                                to="/"
                                className={`width-full mt-2 h-5 ${
                                    expandedCard ? "h-auto" : ""
                                }`}
                            >
                                <Button
                                    className={`w-full h-full rounded-none bg-blue-300 hover:bg-blue-300 text-black dark:bg-green-300 dark:hover:bg-green-300 dark:text-green-950 font-bold ${
                                        expandedCard
                                            ? "py-2 rounded-md bg-blue-400 dark:bg-green-400"
                                            : ""
                                    } transitional-all duration-300 ease-in-out`}
                                >
                                    {`${expandedCard ? "View details" : ""}`}
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>

            {/* background overlay on card hover */}
            {opts?.expandedBacksplash && (
                <div
                    className={`bg-light-accent dark:bg-dark-accent ${
                        opts?.expandedBacksplash &&
                        `bg-[${opts?.expandedBacksplashColourLight}] dark:bg-[${opts?.expandedBacksplashColourDark}]`
                    } absolute top-0 left-0 h-screen w-screen z-99 pointer-events-none opacity-0 ${
                        expandedCard ? "opacity-20" : ""
                    } transition-opacity duration-300 ease-in-out`}
                ></div>
            )}
        </>
    );
};
