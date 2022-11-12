import React, { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

function ReactDropZone() {
  const [file, setFile] = useState({} as File)
  const onDrop = useCallback(([file]: File[]) => {
    setFile(file)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  })
  const previewImageURL = useMemo(() => {
    if (file.size) {
      return URL.createObjectURL(file)
    }
    return ""
  }, [file])

  return (
    <label
      {...getRootProps()}
      className="flex flex-col sm:flex-row gap-4 items-center self-start cursor-pointer group"
    >
      <figure
        style={{
          backgroundImage: `url(${previewImageURL})`,
          backgroundSize: "cover",
        }}
        className="relative border overflow-hidden bg-zinc-100 min-w-[6rem] h-24 rounded-full"
      >
        <div className="absolute group-hover:bg-white/50 hover:!bg-white/90 inset-0 flex items-center justify-center transition-colors">
          <FiUploadCloud
            className={`${
              previewImageURL && "opacity-0"
            } group-hover:opacity-100 text-xl group-hover:scale-105 transition-transform duration-75`}
          />
        </div>
      </figure>
      <div
        className={`border p-4 rounded-lg ${
          isDragActive && "border-violet-400 ring-2 ring-violet-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-zinc-400 font-ligh">
          <span className="text-violet-700 text-sm font-bold">
            Click to upload
          </span>{" "}
          <span className="hidden sm:inline">
            or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
          </span>
        </p>
      </div>
    </label>
  )
}

export default ReactDropZone
