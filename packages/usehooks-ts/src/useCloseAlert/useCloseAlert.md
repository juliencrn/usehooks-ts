This React Hook allows you to show an alert before the user closes, giving you a few seconds of time to save any modified changes by calling the necessary API.

Whenever your app will be busy sending API calls, simply set `setCanClose(false)` which will show an alert to the user before closing like this 👇

![Example of useCloseAlert() React Hook](https://github.com/vsnthdev/vsnthdev/assets/24322511/67b80685-10bb-44f2-89d5-689f842e901b "Example of useCloseAlert() React Hook")

Once you app is done saving data or calling API, you can allow the user again to close the app immediately by setting `setCanClose(true)` which will disable the alert before closing.
