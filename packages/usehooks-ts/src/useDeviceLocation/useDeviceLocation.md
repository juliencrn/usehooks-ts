The **`useDeviceLocation()`** hook is a custom **React + Typescript** hook that enables easy access to the current geolocation data of the user's device. It abstracts the complexities of fetching and handling geolocation data, providing a straightforward way to retrieve location-related information in a React component.

### Return Values

The hook returns an object with the following properties:

### loading _(boolean_)

A boolean indicating whether the device geolocation data is currently being fetched. When `loading` is true, it means the hook is in the process of obtaining the user's location data. When `loading` is false, it indicates that the geolocation data has been retrieved.

### accuracy (_number_)

The accuracy of the latitude and longitude properties in meters. This value represents the estimated horizontal accuracy of the geolocation data, indicating how precise the latitude and longitude coordinates are.

### altitude (_number_)

The altitude in meters above the mean sea level. This property provides the vertical position of the device, giving the height of the device above sea level if available.

### altitudeAccuracy (_number_)

The accuracy of altitude in meters. This value represents the estimated vertical accuracy of the altitude data, indicating how precise the altitude measurement is.

### heading (_number_)

The direction in which the device is traveling. This value, specified in degrees, indicates how far off the device's heading is from true north. If the device is stationary or the heading is not available, this property will be null.

### latitude (_number_)

The latitude in decimal degrees. This property represents the device's current latitude position on the Earth's surface.

### longitude (_number_)

The longitude in decimal degrees. This property represents the device's current longitude position on the Earth's surface.

### speed (_number_)

The current ground speed of the device, specified in meters per second. This property represents the device's current speed while moving. If the device is stationary or the speed is not available, this property will be null.

### timestamp (_number_)

The timestamp at which the geolocation data was retrieved. This property represents the time (in milliseconds since the Unix epoch) when the location data was obtained.

### error (_object_)

An error object, if an error occurred while retrieving the geolocation data. If an error occurs during the geolocation process, the `error` property will contain an object with two properties:

- `code`: A numeric error code indicating the type of geolocation error that occurred.
- `message`: A descriptive error message providing additional details about the specific error.

If no error occurred, the `error` property will be null.
