import React, { useState, type ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IPopoutImage extends ImgHTMLAttributes<HTMLImageElement> {
  poppedOut?: boolean;
  onPoppedOutChange?: (poppedOut: boolean) => void;
  rotateCardEffect?: boolean;
  opts?: {
    expandedBacksplashColourLight?: string; // e.g. "bg-[#39393b]"
    expandedBacksplashColourDark?: string; // e.g. "dark:bg-[#333333]"
  };
}

export const PopoutImage = ({
  className,
  poppedOut = false,
  onPoppedOutChange,
  rotateCardEffect = false,
  opts,
  ...props
}: IPopoutImage) => {
  const [isPoppedOut, setIsPoppedOut] = useState(poppedOut);

  const rotateCard = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!rotateCardEffect) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPerc = (x / rect.width) * 100;
    const yPerc = (y / rect.height) * 100;

    const rotateY = ((xPerc - 50) / 50) * -10;
    const rotateX = ((yPerc - 50) / 50) * 10;

    if (e.currentTarget) {
      e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handlePoppedOutChange = (newState: boolean) => {
    setIsPoppedOut(newState);
    onPoppedOutChange?.(newState);
  };

  return (
    <>
      {/* base img */}
      <div className="flex justify-center">
        <img
          className={twMerge(
            "object-cover transition-all duration-300",
            className,
          )}
          onClick={() => handlePoppedOutChange(!isPoppedOut)}
          {...props}
        />
      </div>

      {/* popped out img */}
      <div
        className={twMerge(
          "fixed top-0 left-0 z-10000 flex h-screen w-screen items-center justify-center bg-black/70 transition-opacity duration-300",
          opts?.expandedBacksplashColourLight || "bg-light-accent/40",
          opts?.expandedBacksplashColourDark || "dark:bg-dark-accent/40",
          isPoppedOut ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => handlePoppedOutChange(!isPoppedOut)}
      >
        <div className="perspective-[1000px]">
          <img
            className="block max-h-[80vh] max-w-[80vw] scale-100 rounded-md object-contain shadow-2xl transition-transform duration-300"
            onMouseMove={rotateCard}
            onMouseLeave={(e) => {
              if (rotateCardEffect) {
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
              }
            }}
            {...props}
          />
        </div>
      </div>
    </>
  );
};
