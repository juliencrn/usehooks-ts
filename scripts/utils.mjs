export function isHookFile(filename) {
  const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
  return hookRegex.test(filename)
}

export function isDemoFile(filename) {
  const hookDemoRegex = new RegExp('^use[A-Z][a-zA-Z]*.demo.tsx$')
  return hookDemoRegex.test(filename)
}

export function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

export const toQueryParams = (params) => {
  const paramsAsString = Object.entries(params)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?${paramsAsString}`
}
