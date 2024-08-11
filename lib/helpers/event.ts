export const on = <T extends EventTarget>(
  target: T,
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
) => {
  if (target && target.addEventListener)
    target.addEventListener(type, callback, options);
};

export const off = <T extends EventTarget>(
  target: T,
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
) => {
  if (target && target.removeEventListener)
    target.removeEventListener(type, callback, options);
};
