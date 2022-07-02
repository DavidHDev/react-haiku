import { useEffect, useState } from "react"

const usePasteClipboard=()=>{
    const [paste, setPaste] = useState("")
    const [error,setError]=useState("")
    useEffect(() => {
      navigator.clipboard.readText().then(clipText=>setPaste(clipText)).catch(error=>setError(error))
    }, [])
    return {paste,error}

}

export default usePasteClipboard