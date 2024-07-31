import { off, on } from '../helpers/event';
import { useCallback, useEffect } from 'react';

export function useConfirmExit(
  enabled: boolean | (() => boolean),
  message = 'Are you sure you want to exit?',
) {
  const handler = useCallback(
    (e: Event) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true;

      if (!finalEnabled) {
        return;
      }

      e.preventDefault();

      // @ts-ignore
      // NOTE: modern browsers no longer support custom messages with .returnValue
      if (message) {
        e.returnValue = message;
      }

      return message;
    },
    [enabled, message],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    on(window, 'beforeunload', handler);

    return () => off(window, 'beforeunload', handler);
  }, [enabled, handler]);
}
