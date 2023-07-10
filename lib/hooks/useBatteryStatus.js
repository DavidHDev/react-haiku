import { useEffect, useState } from 'react'

export function Home() {
    const [batteryStatus, setBatteryStatus] = useState({
        level : 0,
        isCharging : false
    })

    useEffect(()=>{
      if( navigator.getBattery ){
        navigator.getBattery().then((battery) => {
          let batteryLevel = parseInt(battery.level * 100)
          let betteryCharging = battery.charging
          setBatteryStatus({ 
            level : batteryLevel,
            isCharging: betteryCharging
          })
          return batteryStatus
        })
      }
      else {
        return batteryStatus
      }
    },[batteryStatus])
}


