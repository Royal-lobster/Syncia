import { RiScreenshotLine } from 'react-icons/ri'

const ImageCaptureButton = () => {
  const handleScreenshotClick = async () => {
    const image = await new Promise((resolve) => {
      window.parent.postMessage({ action: 'get-screenshot-image' }, '*')
      window.addEventListener('message', function (event) {
        if (event.data.action === 'get-screenshot-image') {
          resolve(event.data.image)
        }
      })
    })
    console.log('image', image)
  }
  return (
    <button onClick={handleScreenshotClick} type="button">
      <RiScreenshotLine />
    </button>
  )
}

export default ImageCaptureButton
