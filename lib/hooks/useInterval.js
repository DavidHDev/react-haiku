import { useEffect, useRef, useState } from "react";

export function useInterval(callback, initialDelay) {
  const savedCallback = useRef();

  const [delay, setDelay] = useState(initialDelay);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // runs the interval procedure
    function tick() {
      if (!savedCallback.current) return;
      savedCallback.current();
    }

    // handling interval call
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  // if delay is not set, start it with initialDelay
  const start = (delay) => {
    if (!delay) {
      delay = initialDelay;
    }
    setDelay(delay);
  };

  const stop = () => {
    setDelay(null);
  };

  return { start, stop };
}
