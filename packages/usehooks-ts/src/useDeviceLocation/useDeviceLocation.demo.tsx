import { useDeviceLocation } from '..'

export default function Component() {
  const { coordinates, loading, error, timestamp } = useDeviceLocation()

  return (
    <div>
      <h1>Device Location Demo</h1>
      {loading ? (
        <p>Loading ..</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
          <p>Accuracy: {coordinates.accuracy} meters</p>
          <p>Altitude: {coordinates.altitude} meters</p>
          <p>
            Altitude Accuracy: {coordinates.altitudeAccuracy}
            meters
          </p>
          <p>Heading: {coordinates.heading} degrees</p>
          <p>Speed: {coordinates.speed} meters/second</p>
          <p>Timestamp: {timestamp}</p>
        </div>
      )}
    </div>
  )
}
