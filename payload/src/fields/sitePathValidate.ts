import type { TextFieldSingleValidation } from 'payload'

const checkInternalOrRelative = (v: string): true | string => {
  const isAbsolute = /^https?:\/\//i.test(v) || /^mailto:/i.test(v) || /^tel:/i.test(v)
  if (isAbsolute) return true

  if (/\s/.test(v)) {
    return 'No spaces allowed. Link to the slug as a path, e.g. /locations — not the page title.'
  }
  if (!v.startsWith('/')) {
    return 'Internal links must start with / (example: /locations for slug "locations").'
  }

  return true
}

/** Required menu path — must match a published slug as /slug */
export const sitePathValidate: TextFieldSingleValidation = (value) => {
  const v = typeof value === 'string' ? value.trim() : ''
  if (!v) return 'Required'

  const result = checkInternalOrRelative(v)
  return result === true ? true : result
}

/** Same rules as menu paths, but blank is allowed */
export const optionalSitePathValidate: TextFieldSingleValidation = (value) => {
  const v = typeof value === 'string' ? value.trim() : ''
  if (!v) return true
  return checkInternalOrRelative(v)
}
