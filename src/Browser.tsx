import { useCallback, useState } from 'react'
// import { Browser as LibraryBrowser } from './browsers/alm-squid-salmple'
import { FsDir, hydrateChildren, selectRootDirectory } from './file-system'
import { Box } from './design-system/Box'
import { Button } from './design-system/Button'
import { FsBrowser } from './design-system/FsBrowser'
import { isNotFalsy } from './utils/isNotFalsy'
import { LibraryBrowser } from './design-system/LibraryBrowser'

export default function FileBrowser() {
  const [dir, setDir] = useState<FsDir>()

  const selectDirectory = useCallback(async () => {
    return selectRootDirectory()
      .then((dir) => hydrateChildren(dir, { recursive: true }))
      .then(setDir)
  }, [setDir])

  return (
    <Box>
      {!isNotFalsy(dir) ? (
        <>
          <Button onClick={selectDirectory}>{'Select directory'}</Button>
          <LibraryBrowser />
        </>
      ) : (
        <FsBrowser rootDir={dir} />
      )}
    </Box>
  )
}
