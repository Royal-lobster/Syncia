import { RiCloseLine } from 'react-icons/ri'
import { MessageFile } from '../../../hooks/useMessageDraft'

interface FilePreviewBarProps {
  files: MessageFile[]
  removeFile: (id: string) => void
}

const FilePreviewBar = ({ files, removeFile }: FilePreviewBarProps) => {
  return (
    <div className="cdx-flex cdx-gap-2 cdx-m-2">
      {files.map((file) => (
        <div key={file.id} className="cdx-flex cdx-relative">
          <div className="cdx-flex-grow">
            <img
              src={URL.createObjectURL(file.blob)}
              alt="preview"
              className="cdx-w-14 cdx-h-14 cdx-object-cover cdx-rounded cdx-bg-neutral-500"
            />
          </div>
          <button
            onClick={() => removeFile(file.id)}
            type="button"
            className="cdx-absolute cdx-top-0.5 cdx-right-0.5 cdx-bg-black/30 cdx-rounded-full cdx-text-neutral-500 dark:cdx-text-neutral-200 cdx-ml-2"
          >
            <RiCloseLine size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default FilePreviewBar
