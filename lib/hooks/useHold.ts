import { off, on } from "../helpers/event";
import { useCallback, useRef } from "react";

type EventType = MouseEvent | TouchEvent;
const isTouchEvent = (e: Event) => e instanceof TouchEvent;

const preventDefault = (e: Event) => {
  if (!isTouchEvent(e)) return;

  if ((e as TouchEvent).touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
};

export const useHold = <Callback = void>(
  callback: (e: EventType) => Callback,
  { doPreventDefault = true, delay = 1000 } = {}
) => {
  const timeout = useRef<number | undefined>();
  const target = useRef<EventTarget | undefined>();

  const start = useCallback(
    (event: EventType) => {
      if (doPreventDefault && event.target) {
        on(event.target, "touchend", preventDefault, { passive: false });
        target.current = event.target;
      }

      timeout.current = setTimeout(
        () => callback(event),
        delay
      ) as unknown as number;
    },
    [callback, delay, doPreventDefault]
  );

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);

    if (doPreventDefault && target.current) {
      off(target.current, "touchend", preventDefault);
    }
  }, [doPreventDefault]);

  return {
    onMouseDown: (e: MouseEvent) => start(e),
    onTouchStart: (e: TouchEvent) => start(e),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  };
};
