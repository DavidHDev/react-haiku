import { useEffect, useState } from 'react'

export function useBatteryStatus() {
    const [batteryStatus, setBatteryStatus] = useState({
        level : 0,
        status : false
    })

    useEffect(()=>{
      window.onload = () => {
          if(!navigator.getBattery){
              return batteryStatus
          }
      }

      navigator.getBattery().then((battery) => {
          let batteryLevel = parseInt(battery.level * 100)
          let betteryCharging = battery.charging
          setBatteryStatus({ 
            level : batteryLevel,
            status: betteryCharging
          })
          return batteryStatus
      })
    },[batteryStatus])

  return batteryStatus
}