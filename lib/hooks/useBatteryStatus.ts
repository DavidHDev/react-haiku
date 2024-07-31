import { useEffect, useState } from 'react';

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery, but because getBattery | BatteryManager is not on the Navigator type, we have to create our own type
type NavigatorType = Navigator & {
  getBattery: () => Promise<
    {
      charging: boolean;
      level: number;
    } & EventTarget
  >;
};

export function useBatteryStatus() {
  const [batteryStatus, setBatteryStatus] = useState({
    level: 0,
    isCharging: false,
  });

  useEffect(() => {
    if ((navigator as NavigatorType).getBattery) {
      (navigator as NavigatorType).getBattery().then((battery) => {
        const batteryLevel = parseInt((battery.level * 100).toString());
        const betteryCharging = battery.charging;

        setBatteryStatus({
          level: batteryLevel,
          isCharging: betteryCharging,
        });
      });
    }

    const handleBatteryLevelChange = () => {
      (navigator as NavigatorType).getBattery().then((battery) => {
        const batteryLevel = parseInt((battery.level * 100).toString());
        const betteryCharging = battery.charging;

        setBatteryStatus({
          level: batteryLevel,
          isCharging: betteryCharging,
        });
      });
    };
    (navigator as NavigatorType).getBattery().then((battery) => {
      battery.addEventListener('chargingchange', handleBatteryLevelChange);
      battery.addEventListener('levelchange', handleBatteryLevelChange);
    });

    return () => {
      (navigator as NavigatorType).getBattery().then((battery) => {
        battery.removeEventListener('chargingchange', handleBatteryLevelChange);
        battery.removeEventListener('levelchange', handleBatteryLevelChange);
      });
    };
  }, []);

  return batteryStatus;
}
