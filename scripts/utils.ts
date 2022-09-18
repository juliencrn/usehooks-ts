export function isHookFile(filename: string): boolean {
  const hookRegex = new RegExp('^use[A-Z][a-zA-Z]*$')
  return hookRegex.test(filename)
}

export function isDemoFile(filename: string): boolean {
  const hookDemoRegex = new RegExp('^use[A-Z][a-zA-Z]*.demo.tsx$')
  return hookDemoRegex.test(filename)
}

export function camelToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toQueryParams = (params: Record<string, any>): string => {
  const paramsAsString = Object.entries(params)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `?${paramsAsString}`
}
