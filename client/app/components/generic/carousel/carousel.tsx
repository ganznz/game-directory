import React, { useState } from "react";

interface CarouselProps {
    children: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = React.Children.toArray(children);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="flex gap-4 justify-center">
            <button
                onClick={prevSlide}
                className="bg-gray-800 text-white p-2 rounded"
            >
                Prev
            </button>

            <div>
                <div className="flex overflow-hidden">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-full transition-transform duration-300"
                            style={{
                                transform: `translateX(-${
                                    currentIndex * 100
                                }%)`,
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div>
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                                index === currentIndex
                                    ? "bg-gray-800"
                                    : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={nextSlide}
                className="bg-gray-800 text-white p-2 rounded"
            >
                Next
            </button>
        </div>
    );
};
