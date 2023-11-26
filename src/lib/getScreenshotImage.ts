/**
 * We use this function to
 * 1. Create a snipping tool view for the user to select the area of the screen
 * 2. Grab the screen image with canvas
 * 3. Crop the image with the user's selection
 * 4. Return the cropped image as a blob
 */
export const getScreenshotImage = async () => {
  // Create a snipping tool view for the user to select the area of the screen
  const snippingTool = document.createElement('div')
  snippingTool.style.position = 'fixed'
  snippingTool.style.top = '0'
  snippingTool.style.left = '0'
  snippingTool.style.width = '100vw'
  snippingTool.style.height = '100vh'
  snippingTool.style.zIndex = '999'
  snippingTool.style.background = 'rgba(0, 0, 0, 0.5)'
  snippingTool.style.cursor = 'crosshair'
  document.body.appendChild(snippingTool)

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
    snippingTool.addEventListener('mousedown', (e) => {
      const startX = e.clientX
      const startY = e.clientY
      snippingTool.addEventListener('mouseup', (e) => {
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
