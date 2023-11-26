import { RiCloseLine } from 'react-icons/ri'
import { MessageFile } from '../../../hooks/useMessageDraft'

interface FilePreviewBarProps {
  files: MessageFile[]
  removeFile?: (id: string) => void
}

const FilePreviewBar = ({ files, removeFile }: FilePreviewBarProps) => {
  if (files.length === 0) return null

  return (
    <div className="cdx-flex cdx-gap-2 cdx-m-2">
      {files.map((file) => {
        const imageUrl = URL.createObjectURL(file.blob)
        return (
          <div key={file.id} className="cdx-flex cdx-relative">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cdx-block cdx-flex-grow"
            >
              <img
                src={imageUrl}
                alt="preview"
                className="cdx-w-14 cdx-h-14 cdx-object-contain cdx-rounded dark:cdx-bg-neutral-800 cdx-bg-neutral-400"
              />
            </a>
            {removeFile && (
              <button
                onClick={() => removeFile(file.id)}
                type="button"
                className="cdx-absolute cdx-top-0.5 cdx-right-0.5 cdx-bg-black/30 cdx-rounded-full cdx-text-neutral-500 dark:cdx-text-neutral-200 cdx-ml-2"
              >
                <RiCloseLine size={16} />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FilePreviewBar
