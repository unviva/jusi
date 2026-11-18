import { jusi } from './jusi.js'

/* METHODS */

// layout
export const layout = {}

/**
 * Shows the loading overlay.
 *
 * Changes the loading overlay's CSS display property to "flex".
 *
 * @returns {void}
 */
layout.suspense = () => {
  jusi.components.loadingOverlay.style.display = 'flex'
}

/**
 * Hides the loading overlay.
 *
 * Changes the loading overlay's CSS display property to "none".
 *
 * @returns {void}
 */
layout.release = () => {
  jusi.components.loadingOverlay.style.display = 'none'
}

/**
 * Smoothly scrolls the browser window to the top of the page.
 *
 * @returns {void}
 */
layout.scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })

// String
export const string = {}

/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str - The string to modify.
 * @returns {string} The string with an uppercased first character.
 *
 * @example
 * string.ucfirst('hello') // "Hello"
 */
string.ucfirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Generates a random base-36 string.
 *
 * The returned string may contain fewer than numChars characters because
 * Math.random().toString(36) does not always produce enough digits.
 *
 * @param {number} [numChars=8] - Maximum number of characters to return.
 * @returns {string} A random base-36 string.
 *
 * @example
 * string.hash(6) // "a9bx2k" (sample; result is random)
 */
string.hash = (numChars = 8) =>
  Math.random().toString(36).substring(0, numChars)

/**
 * Formats a number as a US dollar amount.
 *
 * @param {number|string} str - The numeric value to format.
 * @returns {string} The value formatted as USD currency.
 *
 * @example
 * string.formatMoney(2500.99) // "$2,500.99"
 */
string.formatMoney = (str) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  
  return formatter.format(str)
}

// Date
export const date = {}

/**
 * Calculates the number of whole days between now and an end timestamp.
 *
 * @param {number} end - Target time represented as Unix seconds.
 * @returns {number|false} Whole days remaining, or false if end is in the past.
 *
 * @example
 * date.daysUntil(Date.now() / 1000 + 172800) // 2
 * date.daysUntil(Date.now() / 1000 - 100)   // false
 */
date.daysUntil = (end) => {
  const now = Math.floor(Date.now() / 1000)
  
  if (now > end) {
    return false
  }
  
  return Math.floor((end - now) / 86400)
}

/**
 * Extracts only the YYYY-MM-DD portion of an ISO date-time string.
 *
 * @param {string} iso - A string containing an ISO date-time value.
 * @returns {string} The date portion before "T".
 *
 * @example
 * date.ISOtoDate('2026-11-18T10:30:00Z')
 * // "2026-11-18"
 */
date.ISOtoDate = (iso) => iso.split('T')[0]

/**
 * Converts a date string into an ISO 8601 date-time string.
 *
 * @param {string|number|Date} dateStr - A value accepted by Date.
 * @returns {string} The date in ISO 8601 format.
 * @throws {RangeError} If dateStr is invalid.
 *
 * @example
 * date.dateToISO('2026-11-18')
 * // "2026-11-18T00:00:00.000Z" in UTC
 */
date.dateToISO = (dateStr) => {
  const dt = new Date(dateStr)
  return dt.toISOString()
}

/**
 * Gets the current Unix timestamp.
 *
 * @returns {number} Current time in seconds since 1970-01-01 UTC.
 *
 * @example
 * date.nowUnix() // e.g. 1795000000
 */
date.nowUnix = () =>
  Math.floor(new Date().getTime() / 1000)

/**
 * Gets the current calendar year.
 *
 * @returns {number} The current year.
 *
 * @example
 * date.currentYear() // 2026
 */
date.currentYear = () =>
  new Date().getFullYear()

/**
 * Formats a date using a locale.
 *
 * @param {string|number|Date} dateStr - A value accepted by Date.
 * @param {string} [locale='en-US'] - The locale identifier to use.
 * @returns {string} The localized date string.
 *
 * @example
 * date.format('2026-11-18', 'en-US') // "11/18/2026"
 * date.format('2026-11-18', 'de-DE') // "18.11.2026"
 */
date.format = (dateStr, locale = 'en-US') => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat(locale).format(date)
}

export default {
  layout,
  string,
  date,
}