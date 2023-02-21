export type OS =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'android'
  | 'ios'
  | 'indeterminate'

const getOS = (): OS => {
  const { userAgent } = navigator

  const linux = /Linux/i
  const android = /Android/i
  const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i
  const macOSPlatforms = /(Mac68K)|(MacPPC)|(MacIntel)|(Macintosh)/i
  const iOSPlatforms =
    /(iPhone)|(iPad)|(iPod)|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/i

  if (windowsPlatforms.test(userAgent)) {
    return 'windows'
  }

  if (macOSPlatforms.test(userAgent)) {
    return 'macos'
  }

  if (iOSPlatforms.test(userAgent)) {
    return 'ios'
  }

  if (android.test(userAgent)) {
    return 'android'
  }

  if (linux.test(userAgent)) {
    return 'linux'
  }

  return 'indeterminate'
}

const useOS = (): OS => {
  if (navigator !== undefined) {
    return getOS()
  }

  return 'indeterminate'
}

export default useOS
