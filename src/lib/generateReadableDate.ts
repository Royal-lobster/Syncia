/**
 * Generate a readable date from a date string
 * such as Just now, 5 minutes ago, 1 hour ago, etc.
 */
export const generateReadableRelativeDate = (
  date: Date | number | string,
  nowDate: Date | number | string = Date.now(),
) => {
  const dateObj = new Date(date)
  const nowDateObj = new Date(nowDate)

  const diff = nowDateObj.getTime() - dateObj.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (seconds < 60) {
    return 'Just now'
  } else if (minutes < 60) {
    return `${minutes} mins ago`
  } else if (hours < 24) {
    return `${hours} hr ago`
  } else {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
}
