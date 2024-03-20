export const isWavFileHandle = (
  fileHandle:
    | FileSystemFileHandle
    | FileSystemDirectoryHandle
    | undefined
    | null,
): fileHandle is FileSystemFileHandle => {
  return fileHandle?.kind === "file" && fileHandle?.name.endsWith(".wav")
}

export const getFileUrl = async (
  fileHandle: FileSystemFileHandle | undefined,
): Promise<string | undefined> => {
  return fileHandle?.getFile().then((file) => file && URL.createObjectURL(file))
}
