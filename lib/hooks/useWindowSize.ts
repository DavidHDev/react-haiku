import { useState, useEffect } from "react";

type WindowSizeProps = {
  width: number;
  height: number;
};

export const useWindowSize = (): WindowSizeProps => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return windowSize;
} 