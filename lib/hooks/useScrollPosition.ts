import { useState } from "react";
import { useEventListener } from "./useEventListener";

const getPosition = () =>
  typeof window !== "undefined"
    ? { x: window.scrollX, y: window.scrollY }
    : { x: 0, y: 0 };

const setPosition = ({ x, y }: { x?: number; y?: number }) => {
  if (typeof window !== "undefined") {
    const scrollOptions: ScrollToOptions = { behavior: "smooth" };

    if (typeof x === "number") scrollOptions.left = x;
    if (typeof y === "number") scrollOptions.top = y;

    window.scrollTo(scrollOptions);
  }
};

export function useScrollPosition() {
  const [currentPosition, setCurrentPosition] = useState(getPosition());

  (["scroll", "resize"] as const).forEach((item) =>
    useEventListener(item, () => setCurrentPosition(getPosition()))
  );

  return [currentPosition, setPosition];
}
