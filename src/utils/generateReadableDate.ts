export const generateReadableRelativeDate = (
  date: Date | number | string,
  nowDate: Date | number | string = Date.now(),
  rft: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
  }),
) => {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const WEEK = 7 * DAY
  const MONTH = 30 * DAY
  const YEAR = 365 * DAY
  const intervals = [
    { ge: YEAR, divisor: YEAR, unit: 'yr' },
    { ge: MONTH, divisor: MONTH, unit: 'mo' },
    { ge: WEEK, divisor: WEEK, unit: 'wk' },
    { ge: DAY, divisor: DAY, unit: 'day' },
    { ge: HOUR, divisor: HOUR, unit: 'hr' },
    { ge: MINUTE, divisor: MINUTE, unit: 'min' },
    { ge: 30 * SECOND, divisor: SECOND, unit: 'sec' },
    { ge: 0, divisor: 1, text: 'just now' },
  ]
  const now =
    typeof nowDate === 'object'
      ? (nowDate as Date).getTime()
      : new Date(nowDate).getTime()
  const diff =
    now -
    (typeof date === 'object'
      ? (date as Date).getTime()
      : new Date(date).getTime())
  const diffAbs = Math.abs(diff)
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor)
      const isFuture = diff < 0
      return interval.unit
        ? rft.format(
            isFuture ? x : -x,
            interval.unit as Intl.RelativeTimeFormatUnit,
          )
        : interval.text
    }
  }
}
