import { FsItem } from './types'

export type { FsItem }

const v = (): number => Math.random()

export const selectRootDirectory = async (): Promise<FsItem> => {
  const handle = await window.showDirectoryPicker()
  return {
    handle,
    kind: handle.kind,
    name: handle.name,
    children: undefined,
    version: v(),
  }
}

export const hydrateChildren = async (
  fsDir: FsItem,
  recursive = false,
): Promise<FsItem> => {
  if (!fsDir.children && fsDir.handle.kind === 'directory') {
    fsDir.children = {}
    fsDir.version = v()
    for await (const handle of fsDir.handle.values()) {
      fsDir.children[handle.name] = {
        handle,
        version: v(),
        kind: handle.kind,
        name: handle.name,
        children: undefined,
      }
      if (recursive) {
        await hydrateChildren(fsDir.children[handle.name], recursive)
      }
    }
  }

  return fsDir
}

export const getItemAtPath = async (
  root: FsItem,
  path: string[],
): Promise<FsItem | undefined> => {
  let item: FsItem | undefined = root

  for (const p of path) {
    item = item?.children?.[p]
  }

  return item
}

const getFileAtPath = async (
  root: FsItem,
  path: string[],
): Promise<File | undefined> => {
  const fsItem = await getItemAtPath(root, path)
  if (fsItem?.handle.kind === 'file') {
    return fsItem.handle.getFile()
  }
}

export const readTextAtPath = async (
  root: FsItem,
  path: string[],
): Promise<string | undefined> => {
  const file = await getFileAtPath(root, path)
  return await file?.text()
}

export const getFileUrl = async (
  fsItem: FsItem | undefined,
): Promise<string | undefined> => {
  if (fsItem?.handle.kind === 'file') {
    return fsItem.handle
      .getFile()
      .then((file) => file && URL.createObjectURL(file))
  }
}
