import { useEffect, useState } from "react"
import { InteractionManager } from "react-native";

export const useMounted = (sleep?: number) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setMounted(true)
      }, sleep || 300)
    })

  }, [sleep])

  return mounted
}
