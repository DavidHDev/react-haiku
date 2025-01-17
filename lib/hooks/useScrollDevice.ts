import { useState, useEffect } from "react";

type ScrollDevice = "mouse" | "trackpad" | null;

export function useScrollDevice(): ScrollDevice {
  const [deviceType, setDeviceType] = useState<ScrollDevice>(null);
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    let lastEventTimestamp = 0;
    let lastDeltaY = 0;

    const detectScrollDevice = (event: WheelEvent) => {
      const now = performance.now();
      const timeDiff = now - lastEventTimestamp;

      const isTrackpad = (
        Math.abs(event.deltaY) < 50 || // Small delta values indicate trackpad
        (Math.abs(event.deltaX) > 0 && Math.abs(event.deltaY) < 50) // Trackpads scroll in both directions
      );

      const isMouseWheel = (
        Math.abs(event.deltaY) >= 50 || // Large jumps indicate mouse wheel
        (timeDiff > 50 && Math.abs(event.deltaY - lastDeltaY) < 10) // Consistent jumps suggest a wheel
      );

      const detectedDevice = isTrackpad ? "trackpad" : isMouseWheel ? "mouse" : null;

      lastEventTimestamp = now;
      lastDeltaY = event.deltaY;

      // Debounce: Ensure only the last detected value is stored
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        setDeviceType(detectedDevice);
      }, 200); // Adjust debounce time if needed
    };

    window.addEventListener("wheel", detectScrollDevice);

    return () => {
      window.removeEventListener("wheel", detectScrollDevice);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, []);

  return deviceType;
}
