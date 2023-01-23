import { useEffect, useState } from 'react'

function useRandomArrayItem(array: unknown[], interval: number) {
  const [randomItem, setRandomItem] = useState(array[0])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomItem(array[Math.floor(Math.random() * array.length)])
    }, interval)

    return () => clearInterval(intervalId)
  }, [array, interval])

  return randomItem
}

export default useRandomArrayItem
