export type FsFile = Pick<FileSystemFileHandle, 'name' | 'kind'> & {
  readonly handle: FileSystemFileHandle
  textValue?: string | undefined | null
}

export type FsDir = Pick<FileSystemDirectoryHandle, 'name' | 'kind'> & {
  readonly handle: FileSystemDirectoryHandle
  children: undefined | Array<FsDir | FsFile>
}
