import { useEffect, useState } from "react";

export const useSize = (ref: any) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateDimensions = () => {
      const { clientWidth, clientHeight } = ref.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    };

    const resizeObserver = new ResizeObserver(updateDimensions);

    updateDimensions();
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);

  return dimensions;
};
