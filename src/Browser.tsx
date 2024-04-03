import { useCallback, useEffect, useState } from 'react'
import { FsDir, hydrateChildren, selectRootDirectory } from './file-system'
import { FsBrowser } from './design-system/FsBrowser'
import { LibraryBrowser } from './design-system/LibraryBrowser'
import { Library } from './browsers/types'
// import { buildLibrary } from './browsers/alm-squid-salmple/utils'
import { buildLibrary } from './browsers/squarp-rample/utils'
import { Box, Inline, Stack } from '@atlaskit/primitives'

import Button from '@atlaskit/button/new'

export default function FileBrowser() {
  const [dir, setDir] = useState<FsDir>()
  const [lib, setLib] = useState<Library>()

  const selectDirectory = useCallback(async () => {
    return selectRootDirectory()
      .then((dir) => hydrateChildren(dir, { recursive: true }))
      .then(setDir)
  }, [setDir])

  useEffect(() => {
    if (dir) {
      buildLibrary(dir).then(setLib)
    }
  }, [dir])

  return (
    <Stack grow={'fill'} space={'space.100'}>
      <Box>
        <Button onClick={selectDirectory}>{'Select directory'}</Button>
      </Box>
      <Inline grow={'fill'} alignBlock={'stretch'}>
        {!!dir && <FsBrowser rootDir={dir} />}
        {!!lib && <LibraryBrowser library={lib} />}
      </Inline>
    </Stack>
  )
}
