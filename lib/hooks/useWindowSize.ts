import { useState, useEffect } from "react";

type WindowSizeProps = {
  width: number;
  height: number;
};

export const useWindowSize = (): WindowSizeProps => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: window.innerWidth, 
    height: window.innerHeight
  });

  useEffect(() =>{
    const handleResize = () => {
    setWindowSize({ 
      width: window.innerWidth, 
      height: window.innerHeight
    })
  }

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  }, [])
  return windowSize;
} 