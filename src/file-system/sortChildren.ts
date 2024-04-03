import { orderBy } from 'natural-orderby'
import { FsDir, FsFile } from '.'

interface SortChildrenOptions {
  folders?: 'first' | 'last' | null
  names?: 'asc' | 'desc'
}

export const sortChildren = (
  items: (FsDir | FsFile)[],
  opts?: SortChildrenOptions,
): (FsDir | FsFile)[] => {
  const { folders = 'first', names = 'asc' } = { ...opts }

  return orderBy(
    items,
    [({ kind }) => (folders ? kind : 0), ({ name }) => name],
    [folders === 'first' ? 'asc' : 'desc', names],
  )
}
