import { act, renderHook } from '@testing-library/react-hooks/dom'

import { useDeviceLocation } from './useDeviceLocation'

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

describe('useDeviceLocation', () => {
  test('should return loading as true initially', () => {
    const { result } = renderHook(() => useDeviceLocation())

    expect(result.current.loading).toBe(true)
    expect(result.current.coordinates).toEqual({
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    })
    expect(result.current.timestamp).toBe(null)
    expect(result.current.error).toBe(null)
  })

  test('should update state when geolocation data is available', () => {
    const latitude = 51.5074
    const longitude = -0.1278
    const accuracy = 10
    const timestamp = 1630930800000

    mockGeolocation.getCurrentPosition.mockImplementation(successCallback =>
      successCallback({
        coords: {
          latitude,
          longitude,
          altitude: null,
          accuracy,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp,
      }),
    )

    const { result } = renderHook(() => useDeviceLocation())

    expect(result.current.loading).toBe(true)

    act(() => {
      mockGeolocation.getCurrentPosition.mock.calls[0][0]({
        coords: {
          latitude,
          longitude,
          altitude: null,
          accuracy,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp,
      })
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.coordinates.latitude).toBe(latitude)
    expect(result.current.coordinates.longitude).toBe(longitude)
    expect(result.current.coordinates.accuracy).toBe(accuracy)
    expect(result.current.timestamp).toBe(timestamp)
    expect(result.current.error).toBe(null)
  })

  test('should update state when geolocation data retrieval fails', () => {
    const errorCode = 1
    const errorMessage = 'Geolocation permission denied.'

    mockGeolocation.getCurrentPosition.mockImplementation(
      (successCallback, errorCallback) =>
        errorCallback({
          code: errorCode,
          message: errorMessage,
        }),
    )

    const { result } = renderHook(() => useDeviceLocation())

    expect(result.current.loading).toBe(true)

    act(() => {
      mockGeolocation.getCurrentPosition.mock.calls[0][1]({
        code: errorCode,
        message: errorMessage,
      })
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.coordinates.latitude).toBe(null)
    expect(result.current.coordinates.longitude).toBe(null)
    expect(result.current.coordinates.accuracy).toBe(null)
    expect(result.current.timestamp).toBe(null)
    expect(result.current.error).toEqual({
      code: errorCode,
      message: errorMessage,
    })
  })
})
