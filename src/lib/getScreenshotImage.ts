/**
 * We use this function to
 * 1. Create a snipping tool view for the user to select the area of the screen
 * 2. Grab the coordinates of the user's selection
 * 3. Take a screenshot of the screen
 * 4. Crop the screenshot to the user's selection
 * 5. Return the cropped image as a blob
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

  // Remove the snipping tool view
  document.body.removeChild(snipeRegion)
  document.body.removeChild(snipeSelection)
  await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for the DOM to update

  // Ensure that the coordinates are defined before using them
  if (
    typeof startX === 'undefined' ||
    typeof startY === 'undefined' ||
    typeof endX === 'undefined' ||
    typeof endY === 'undefined'
  ) {
    throw new Error('Selection coordinates have not been defined.')
  }

  // Take a screenshot of the screen
  const screenshot = await new Promise<string>((resolve) => {
    chrome.runtime.sendMessage({ action: 'captureVisibleTab' }, (dataUrl) => {
      console.log({ dataUrl })
      resolve(dataUrl)
    })
  })

  // Create a canvas element and draw the screenshot on it
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = endX > startX ? endX - startX : startX - endX
  canvas.height = endY > startY ? endY - startY : startY - endY
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
  const image: HTMLImageElement = new Image()
  image.src = screenshot

  // Wait for the image to load
  await new Promise((resolve) => {
    image.onload = resolve
  })

  // Crop the screenshot to the user's selection
  const finalStartX = startX < endX ? startX : endX
  const finalStaryY = startY < endY ? startY : endY

  ctx.drawImage(
    image,
    finalStartX * window.devicePixelRatio,
    finalStaryY * window.devicePixelRatio,
    canvas.width * window.devicePixelRatio,
    canvas.height * window.devicePixelRatio,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  // Convert the canvas to a blob and return it
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!)
    })
  })
}
