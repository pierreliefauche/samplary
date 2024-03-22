export type FsItem = Pick<
  FileSystemFileHandle | FileSystemDirectoryHandle,
  'name' | 'kind'
> & {
  handle: FileSystemFileHandle | FileSystemDirectoryHandle
  version: number
  children: undefined | Record<string, FsItem>
}
