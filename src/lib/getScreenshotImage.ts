/**
 * We use this function to
 * 1. Create a snipping tool view for the user to select the area of the screen
 * 2. Grab the screen image with canvas
 * 3. Crop the image with the user's selection
 * 4. Return the cropped image as a blob
 */
export const getScreenshotImage = async () => {
  // Create a snipping tool view for the user to select the area of the screen
  const snipeRegion = document.createElement('div')
  snipeRegion.style.position = 'fixed'
  snipeRegion.style.top = '0'
  snipeRegion.style.left = '0'
  snipeRegion.style.width = '100vw'
  snipeRegion.style.height = '100vh'
  snipeRegion.style.zIndex = '2147483646' // Maximum z-index
  snipeRegion.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  snipeRegion.style.cursor = 'crosshair'
  document.body.appendChild(snipeRegion)

  const snipeSelection = document.createElement('div')
  snipeSelection.style.position = 'fixed'
  snipeSelection.style.top = '0'
  snipeSelection.style.left = '0'
  snipeSelection.style.width = '0'
  snipeSelection.style.height = '0'
  snipeSelection.style.border = '1px solid #ffffff0a'
  snipeSelection.style.backgroundColor = 'rgba(256, 256, 256, 0.1)'
  snipeSelection.style.zIndex = '2147483647' // Maximum z-index
  document.body.appendChild(snipeSelection)

  // Grab the screen image with canvas
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Crop the image with the user's selection
  await new Promise((resolve) => {
    snipeRegion.addEventListener('mousedown', (e) => {
      const startX = e.clientX
      const startY = e.clientY

      snipeSelection.style.top = `${startY}px`
      snipeSelection.style.left = `${startX}px`

      // Update the snipping tool view when the user moves the mouse
      document.addEventListener('mousemove', (e) => {
        snipeSelection.style.width = `${Math.abs(e.clientX - startX)}px`
        snipeSelection.style.height = `${Math.abs(e.clientY - startY)}px`
      })

      // Crop the image when the user releases the mouse
      snipeRegion.addEventListener('mouseup', (e) => {
        const endX = e.clientX
        const endY = e.clientY
        const width = endX - startX
        const height = endY - startY
        const imageData = ctx.getImageData(startX, startY, width, height)
        ctx.putImageData(imageData, 0, 0)
        resolve(null)
      })
    })
  })

  // Remove the snipping tool view
  document.body.removeChild(snipeRegion)
  document.body.removeChild(snipeSelection)

  // Return the cropped image as a blob
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    })
  })
  if (!blob) {
    throw new Error('Could not get blob')
  }
  return blob
}
