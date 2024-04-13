import { RiScreenshot2Line } from 'react-icons/ri'

interface ImageCaptureButtonProps {
  addMessageDraftFile: (blob: Blob) => void
}

const ImageCaptureButton = ({
  addMessageDraftFile,
}: ImageCaptureButtonProps) => {
  const handleScreenshotClick = async () => {
    const imageBlob: Blob = await new Promise((resolve) => {
      window.parent.postMessage({ action: 'get-screenshot-image' }, '*')
      window.addEventListener('message', (event) => {
        const { action, payload } = event.data
        if (action === 'get-screenshot-image') {
          resolve(payload)
        }
      })
    })

    addMessageDraftFile(imageBlob as Blob)
  }
  return (
    <button
      onClick={handleScreenshotClick}
      type="button"
      className="cdx-bg-neutral-300 cdx-text-neutral-500 dark:cdx-text-neutral-200 dark:cdx-bg-neutral-800 cdx-p-1.5 cdx-rounded"
    >
      <RiScreenshot2Line size={18} />
    </button>
  )
}

export default ImageCaptureButton
