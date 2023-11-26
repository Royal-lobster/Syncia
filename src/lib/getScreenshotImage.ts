import html2canvas from 'html2canvas'

/**
 * We use this function to
 * 1. Create a snipping tool view for the user to select the area of the screen
 * 2. Grab the screen image with canvas
 * 3. Crop the image with the user's selection
 * 4. Return the cropped image as a blob
 *
 * TODO: This approach is not ideal as the website visible to user may not be the same as the one
 * captured by html2canvas. For example, if the user has adblock installed, the website may look
 * different to the one captured by html2canvas. We should consider another approach to capture
 */
export const getScreenshotImage = async (): Promise<Blob> => {
  // Create a snipping tool view for the user to select the area of the screen
  const snipeRegion: HTMLDivElement = document.createElement('div')
  snipeRegion.style.position = 'fixed'
  snipeRegion.style.top = '0'
  snipeRegion.style.left = '0'
  snipeRegion.style.width = '100vw'
  snipeRegion.style.height = '100vh'
  snipeRegion.style.zIndex = '2147483646' // Maximum z-index
  snipeRegion.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  snipeRegion.style.cursor = 'crosshair'

  const snipeSelection: HTMLDivElement = document.createElement('div')
  snipeSelection.style.position = 'fixed'
  snipeSelection.style.border = '1px solid #ffffff2a'
  snipeSelection.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
  snipeSelection.style.zIndex = '2147483647' // Maximum z-index

  document.body.appendChild(snipeRegion)
  document.body.appendChild(snipeSelection)

  // Create a canvas element
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Initially declare the variables with a type and set to undefined
  let startX: number | undefined
  let startY: number | undefined
  let endX: number | undefined
  let endY: number | undefined

  // Wait for the user to make a selection
  await new Promise<void>((resolve) => {
    const onMouseMove = (e: MouseEvent) => {
      if (startX === undefined || startY === undefined) return

      const currentX: number = e.clientX
      const currentY: number = e.clientY
      const width: number = Math.abs(currentX - startX)
      const height: number = Math.abs(currentY - startY)
      snipeSelection.style.width = `${width}px`
      snipeSelection.style.height = `${height}px`
      snipeSelection.style.left = `${Math.min(startX, currentX)}px`
      snipeSelection.style.top = `${Math.min(startY, currentY)}px`
    }

    const onMouseUp = (e: MouseEvent) => {
      endX = e.clientX
      endY = e.clientY
      document.removeEventListener('mousemove', onMouseMove)
      snipeRegion.removeEventListener('mouseup', onMouseUp)
      document.body.removeChild(snipeRegion)
      document.body.removeChild(snipeSelection)
      resolve()
    }

    snipeRegion.addEventListener(
      'mousedown',
      (e: MouseEvent) => {
        startX = e.clientX
        startY = e.clientY
        snipeSelection.style.left = `${startX}px`
        snipeSelection.style.top = `${startY}px`

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp, { once: true })
      },
      { once: true },
    )
  })

  // Ensure that the coordinates are defined before using them
  if (
    typeof startX === 'undefined' ||
    typeof startY === 'undefined' ||
    typeof endX === 'undefined' ||
    typeof endY === 'undefined'
  ) {
    throw new Error('Selection coordinates have not been defined.')
  }

  // Now we can safely use the variables as they have been assigned during the mouse events
  const width: number = Math.abs(endX - startX)
  const height: number = Math.abs(endY - startY)
  const left: number = Math.min(startX, endX)
  const top: number = Math.min(startY, endY)

  // Use html2canvas to capture the content of the page
  const screenshotCanvas: HTMLCanvasElement = await html2canvas(document.body, {
    width: window.innerWidth,
    height: window.innerHeight,
    x: window.scrollX,
    y: window.scrollY,
    scale: 1,
    useCORS: true,
  })

  // Create a cropped canvas as before
  const croppedCanvas: HTMLCanvasElement = document.createElement('canvas')
  croppedCanvas.width = width
  croppedCanvas.height = height
  const croppedCtx: CanvasRenderingContext2D | null =
    croppedCanvas.getContext('2d')
  if (!croppedCtx) {
    throw new Error('Could not get cropped canvas context')
  }

  // Draw the captured area from the screenshotCanvas onto the cropped canvas
  croppedCtx.drawImage(
    screenshotCanvas,
    left,
    top,
    width,
    height,
    0,
    0,
    width,
    height,
  )

  // Convert the cropped canvas to a blob as before
  const blob: Blob | null = await new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Blob conversion failed'))
      }
    })
  })

  if (!blob) {
    throw new Error('Blob is null')
  }

  return blob
}
