import { useEffect, useState } from 'react'

export function useBatteryStatus() {
    const [batteryStatus, setBatteryStatus] = useState({
        level : 0,
        isCharging : false
    })

    useEffect(()=>{
      if(navigator.getBattery){
        navigator.getBattery().then((battery) => {
          let batteryLevel = parseInt(battery.level * 100)
          let betteryCharging = battery.charging
          setBatteryStatus({ 
            level : batteryLevel,
            isCharging: betteryCharging
          })
        })
      }

      const handleBatteryLevelChange = () => {
        navigator.getBattery().then((battery) => {
          let batteryLevel = parseInt(battery.level * 100)
          let betteryCharging = battery.charging
          setBatteryStatus({ 
            level : batteryLevel,
            isCharging: betteryCharging
          })
        })
      }
      navigator.getBattery().then((battery) => {
        battery.addEventListener("chargingchange", handleBatteryLevelChange)
        battery.addEventListener("levelchange", handleBatteryLevelChange)
      })

      return () => {
        navigator.getBattery().then((battery) => {
          battery.removeEventListener("chargingchange", handleBatteryLevelChange)
          battery.removeEventListener("levelchange", handleBatteryLevelChange)
        })
      }
    },[])

    return batteryStatus;
}


