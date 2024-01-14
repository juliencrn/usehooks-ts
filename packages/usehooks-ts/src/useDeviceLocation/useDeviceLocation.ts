import { useEffect, useRef, useState } from 'react'

interface DeviceCoordinates {
  latitude: number | null
  longitude: number | null
  altitude: number | null
  accuracy: number | null
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
}

interface DeviceLocationError {
  code: number
  message: string
}

interface DeviceLocationState {
  loading?: boolean
  coordinates: DeviceCoordinates
  timestamp?: number | null
  error?: DeviceLocationError | null
}

interface DeviceLocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

export function useDeviceLocation(
  options: DeviceLocationOptions = {},
): DeviceLocationState {
  const [location, setLocation] = useState<DeviceLocationState>({
    loading: true,
    coordinates: {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: null,
    error: null,
  })

  const optionsRef = useRef<DeviceLocationOptions>(options)

  useEffect(() => {
    const onSuccess = ({ coords, timestamp }: GeolocationPosition) => {
      setLocation({
        loading: false,
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
        },
        timestamp,
        error: null,
      })
    }

    const onError = (error: GeolocationPositionError) => {
      setLocation(prevState => ({
        ...prevState,
        loading: false,
        error: { code: error.code, message: error.message },
      }))
    }

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      optionsRef.current,
    )

    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      optionsRef.current,
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  const { coordinates, loading, error, timestamp } = location

  return { coordinates, loading, error, timestamp }
}
