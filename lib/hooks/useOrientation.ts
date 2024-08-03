import { useState, useEffect } from "react";

type Orientation = {
  orientation: "portrait" | "landscape";
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>({
    orientation: window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : "landscape",
  });

  useEffect(() => {
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setOrientation({
        orientation: e.matches ? "portrait" : "landscape",
      });
    };

    const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
    portraitMediaQuery.addEventListener("change", handleOrientationChange);

    return () =>
      portraitMediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  return orientation;
};
