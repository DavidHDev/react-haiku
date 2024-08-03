import { useState, useEffect } from "react";

type Orientation = "portrait" | "landscape";

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(window.matchMedia("(orientation: portrait)").matches
    ? "portrait"
    : "landscape");

  useEffect(() => {
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setOrientation(e.matches ? "portrait" : "landscape");
    };

    const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
    portraitMediaQuery.addEventListener("change", handleOrientationChange);

    return () =>
      portraitMediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  return orientation;
};
