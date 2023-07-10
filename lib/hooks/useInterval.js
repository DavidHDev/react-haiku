import { useEffect, useRef, useState } from "react";

/**
 * The useInterval hook takes in two parameters as arguments, first it takes a `callback` function
 * and second is the `initialDelay`.
 * It runs the callback function after every fixed interval of time.
 * 
 * ```js
 * function Timer() {
 *   const { start, stop } = useInterval(() => {
 *     console.log('Runs every one second!')
 *   }, 1000)
 * 
 *   return <div>useInterval</div>;
 * }
 * ```
 * @param {() => void} callback
 * The callback function does not take any input as argument and returns `void` on execution.
 * @param {number} initialDelay 
 * It sets the time period after which the callback gets called.
 * 
 * 
 * @returns {{start: (delay?: number) => void, stop: () => void}}
 */
export function useInterval(callback, initialDelay) {
  if (typeof callback !== 'function') {
    throw new Error(`Invalid parameter type. 'callback' should be a function but received ${callback}`)
  }

  if (typeof initialDelay !== 'number') {
    throw new Error(`Invalid parameter type. 'initialDelay should be a number but received ${initialDelay}'`)
  }

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
  const start = (delay) => { setDelay(delay || initialDelay); };

  const stop = () => { setDelay(null) };

  return { start, stop };
}
