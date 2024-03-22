export const isWavFileHandle = (
  fileHandle:
    | FileSystemFileHandle
    | FileSystemDirectoryHandle
    | undefined
    | null,
): fileHandle is FileSystemFileHandle => {
  return fileHandle?.kind === 'file' && fileHandle?.name.endsWith('.wav')
}
