import { RiScreenshot2Line } from 'react-icons/ri'

interface ImageCaptureButtonProps {
  addMessageDraftFile: (blob: Blob) => void
}

const ImageCaptureButton = ({
  addMessageDraftFile,
}: ImageCaptureButtonProps) => {
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
    addMessageDraftFile(image as Blob)
  }
  return (
    <button
      onClick={handleScreenshotClick}
      type="button"
      className="cdx-bg-neutral-300 cdx-text-neutral-500 dark:cdx-text-neutral-200 dark:cdx-bg-neutral-800 cdx-p-2 cdx-rounded"
    >
      <RiScreenshot2Line size={20} />
    </button>
  )
}

export default ImageCaptureButton
