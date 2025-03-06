import { MousePointerClick, Pointer } from "lucide-react";
import React, { useState, type ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IPopoutImage extends ImgHTMLAttributes<HTMLImageElement> {
  poppedOut?: boolean;
  onPoppedOutChange?: (poppedOut: boolean) => void;
  rotateCardEffect?: boolean;
  opts?: {
    expandedBacksplash?: boolean;
    expandedBacksplashColourLight?: string; // e.g. "bg-[#39393b]"
    expandedBacksplashColourDark?: string; // e.g. "dark:bg-[#333333]"
    returnTextColourLight?: string; // e.g. "text-[#39393b]"
    returnTextColourDark?: string; // e.g. "dark:text-[#333333]"
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
          "fixed top-0 left-0 z-10000 flex h-screen w-screen flex-col items-center justify-center gap-10 bg-black/70 transition-opacity duration-300",
          opts?.expandedBacksplashColourLight || "bg-transparent",
          opts?.expandedBacksplashColourDark || "bg-transparent",
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

        {/* exit text */}
        {/* i hate this :| */}
        <p
          className={twMerge(
            "flex gap-2 italic",
            opts?.returnTextColourLight || "text-gray-500",
            opts?.returnTextColourDark || "dark:text-gray-300",
          )}
        >
          <MousePointerClick className="hidden md:inline" />
          <Pointer className="inline md:hidden" />
          <span
            className={twMerge(
              "hidden md:inline",
              opts?.returnTextColourLight || "text-gray-500",
              opts?.returnTextColourDark || "dark:text-gray-300",
            )}
          >
            Click anywhere to return...
          </span>
          <span
            className={twMerge(
              "inline md:hidden",
              opts?.returnTextColourLight || "text-gray-500",
              opts?.returnTextColourDark || "dark:text-gray-300",
            )}
          >
            Tap anywhere to return...
          </span>
        </p>
      </div>
    </>
  );
};
