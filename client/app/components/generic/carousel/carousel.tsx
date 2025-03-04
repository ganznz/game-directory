import React, { useState, useEffect, useCallback } from "react";

import { Button } from "../button/button";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";

interface ICarousel {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
}

export const Carousel = ({
  children,
  autoPlay = false,
  interval = 5000,
  showIndicators = true,
}: ICarousel) => {
  const ACTION_COOLDOWN = 500;

  const items = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );

    setTimeout(() => setIsTransitioning(false), ACTION_COOLDOWN);
  }, [items.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );

    setTimeout(() => setIsTransitioning(false), ACTION_COOLDOWN);
  }, [items.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => setIsTransitioning(false), ACTION_COOLDOWN);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const intervalId = setInterval(goToNext, interval);
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, goToNext]);

  if (items.length === 0) return;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex justify-center px-12">
        <Button
          onClick={goToPrevious}
          className="absolute top-[50%] left-0 z-2 rounded-full bg-light-accent/60 p-2 shadow-md dark:bg-dark-accent/60"
          aria-label="Next item"
          disabled={isTransitioning}
        >
          <ChevronLeft className="text-gray-600 dark:text-gray-300" />
        </Button>

        <div className="overflow-hidden rounded-lg p-4">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "100% 1fr",
              gridTemplateRows: "100% 1fr",
            }}
          >
            {React.Children.map(children, (child, index) => {
              return (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 justify-center transition-opacity duration-300 ease-in-out ${index !== currentIndex ? "z-[-100] opacity-0" : "opacity-100"}`}
                  style={{ gridArea: "1 / 1 / 2 / 2" }}
                  aria-hidden={index !== currentIndex}
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>

        <Button
          onClick={goToNext}
          className="absolute top-[50%] right-0 z-2 rounded-full bg-light-accent/60 p-2 shadow-md dark:bg-dark-accent/60"
          aria-label="Next item"
          disabled={isTransitioning}
        >
          <ChevronRight className="text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      <div>
        {showIndicators && (
          <div className="flex justify-center gap-1">
            {items.map((_, index) => (
              <Button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full p-0 transition-all ${
                  index === currentIndex ? "w-8 bg-gray-400" : "bg-gray-400/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
