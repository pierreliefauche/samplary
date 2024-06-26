import { FsDir, FsFile } from './types'
import { sortChildren } from './sortChildren'

export type { FsDir, FsFile }

export const isFsFile = (
  item: FsFile | FsDir | null | undefined,
): item is FsFile => {
  return item?.kind === 'file'
}

export const isFsDir = (
  item: FsFile | FsDir | null | undefined,
): item is FsDir => {
  return item?.kind === 'directory'
}

export const isHiddenFsItem = (
  item: FsFile | FsDir | null | undefined,
): boolean => {
  return Boolean(item?.name && item.name.startsWith('.'))
}

export const isWavFile = (
  item: FsFile | FsDir | null | undefined,
): item is FsFile => {
  return isFsFile(item) && item.name.endsWith('.wav')
}

export const selectRootDirectory = async (): Promise<FsDir> => {
  const handle = await window.showDirectoryPicker()
  return {
    handle,
    kind: handle.kind,
    name: handle.name,
    children: undefined,
  }
}

type HydrateChildrenOptions = {
  recursive: boolean
}

export const hydrateChildren = async (
  fsDir: FsDir,
  opts: HydrateChildrenOptions,
): Promise<FsDir> => {
  const { recursive } = opts

  if (!fsDir.children && isFsDir(fsDir)) {
    const children = []

    for await (const handle of fsDir.handle.values()) {
      let child: FsDir | FsFile
      switch (handle.kind) {
        case 'file':
          child = {
            handle,
            name: handle.name,
            kind: handle.kind,
          }
          break
        case 'directory':
          child = {
            handle,
            name: handle.name,
            kind: handle.kind,
            children: undefined,
          }
          if (recursive) {
            await hydrateChildren(child, opts)
          }
          break
        default:
          throw new Error(`Unknown file system kind`)
      }
      children.push(child)
    }

    // Sort children by name
    fsDir.children = sortChildren(children)
  }

  return fsDir
}

export const getItemAtPath = async (
  root: FsDir,
  path: string[],
): Promise<FsDir | FsFile | undefined> => {
  let item: FsDir | FsFile | undefined = root

  for (const p of path) {
    if (isFsDir(item)) {
      item = item?.children?.find((item) => item.name === p)
    } else {
      throw new Error('Invalid FS path')
    }
  }

  return item
}

export const getFileUrl = async (file: FsFile): Promise<string | undefined> => {
  return file.handle.getFile().then((file) => URL.createObjectURL(file))
}

export const readTextValue = async (
  file: FsFile,
): Promise<string | undefined | null> => {
  if (file.textValue === undefined) {
    file.textValue = await file.handle.getFile().then((f) => f.text())
  }

  return file.textValue
}

export const writeTextValue = async (
  file: FsFile,
  text: string,
): Promise<FsFile> => {
  const writableStream = await file.handle.createWritable()
  await writableStream.write(text)
  await writableStream.close()
  file.textValue = text
  return file
}
