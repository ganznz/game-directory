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
    expandedBacksplashColourLight?: string; // e.g. "bg-[#39393b]"
    expandedBacksplashColourDark?: string; // e.g. "dark:bg-[#333333]"
  };
}

const isGameData = (
  data: gameData | genreData | developerData,
): data is gameData => {
  return (data as gameData).totalRating !== undefined;
};

const isGenreData = (
  data: gameData | genreData | developerData,
): data is genreData => {
  return (data as genreData).gameDetails !== undefined;
};

const isDeveloperData = (
  data: gameData | genreData | developerData,
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
      <div className="relative bg-transparent md:max-w-md">
        <div
          className={`relative flex flex-col overflow-hidden rounded-md bg-light-bg shadow-md dark:bg-dark-secondary ${
            expandedCard ? "z-100 overflow-scroll p-5" : ""
          } transform transition-all duration-300 ease-in-out hover:scale-105`}
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
          onMouseDown={() => !loading && setExpandedCard(!expandedCard)}
          ref={cardRef}
        >
          {loading ? (
            // Skeleton loading state
            <div className="min-w-102 p-3">
              <div className="min-h-52 w-full animate-pulse rounded-md bg-light-skeleton-loading dark:bg-dark-skeleton-loading"></div>
              <h3 className="mt-4 h-[20px] animate-pulse rounded-md bg-light-skeleton-loading text-center text-lg font-semibold dark:bg-dark-skeleton-loading"></h3>
            </div>
          ) : (
            <>
              <img
                src={imageUrl}
                alt={`${data.name} cover artwork`}
                className={`-z-10 h-48 overflow-hidden object-cover opacity-80 ${
                  expandedCard ? "rounded-md opacity-100" : ""
                } transition-all duration-300 ease-in-out`}
              />

              <h3 className={`z-10 mt-4 text-center text-lg font-semibold`}>
                {data.name}
              </h3>

              {isGenreData(data) && (
                <p
                  className={`max-h-0 text-gray-600 italic opacity-0 dark:text-gray-300 ${
                    expandedCard
                      ? "mt-4 max-h-40 opacity-100"
                      : "overflow-hidden"
                  } transition-all duration-300 ease-in-out`}
                >
                  <span className="font-bold text-blue-700 dark:text-green-500">
                    {data.gameDetails.name}
                  </span>
                  <span className="text-blue-500 dark:text-green-300">
                    {" features in this genre."}
                  </span>
                </p>
              )}

              {/* summary text visible only when card expanded */}
              {summaryText && (
                <p
                  className={`max-h-0 text-gray-600 italic opacity-0 dark:text-gray-300 ${
                    expandedCard ? "max-h-40 opacity-100" : "overflow-hidden"
                  } transition-all duration-300 ease-in-out ${
                    isGenreData(data) ? "mt-2" : "mt-4"
                  }`}
                >
                  {summaryText}
                </p>
              )}

              <NavLink
                to="/"
                className={`width-full mt-4 h-5 ${
                  expandedCard ? "h-auto" : ""
                }`}
              >
                <Button
                  className={`h-full w-full rounded-none bg-blue-300 font-bold text-black hover:bg-blue-300 dark:bg-green-300 dark:text-green-950 dark:hover:bg-green-300 ${
                    expandedCard
                      ? "rounded-md bg-blue-400 py-2 dark:bg-green-400"
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
          className={`${opts?.expandedBacksplashColourLight || "bg-light-accent"}
          ${opts?.expandedBacksplashColourDark || "dark:bg-dark-accent"}
          pointer-events-none absolute top-0 left-0 z-99 h-screen w-screen opacity-0 ${
            expandedCard ? "opacity-20" : ""
          } transition-opacity duration-300 ease-in-out`}
        ></div>
      )}
    </>
  );
};
