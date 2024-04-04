import { useCallback, useEffect, useState } from 'react'
import { FsDir, hydrateChildren, selectRootDirectory } from './file-system'
import { FsBrowser } from './design-system/FsBrowser'
import { LibraryBrowser } from './design-system/LibraryBrowser'
import { Library } from './browsers/types'
import { buildLibrary as buildAlmSquidSalmpleLibrary } from './browsers/alm-squid-salmple/utils'
import { buildLibrary as buildSquarpRampleLibrary } from './browsers/squarp-rample/utils'
import { buildLibrary as buildVpmeQuadDrumLibrary } from './browsers/vpme-quad-drum/utils'
import { Inline, Stack } from '@atlaskit/primitives'
import Button from '@atlaskit/button/new'
import Select from '@atlaskit/select'

export default function FileBrowser() {
  const [dir, setDir] = useState<FsDir>()
  const [lib, setLib] = useState<Library>()
  const [viewAs, setViewAs] = useState<{ value: string; label: string } | null>(
    { value: 'fs', label: 'File System' },
  )

  const selectDirectory = useCallback(async () => {
    return selectRootDirectory()
      .then((dir) => hydrateChildren(dir, { recursive: true }))
      .then(setDir)
  }, [setDir])

  useEffect(() => {
    setLib(undefined)
    if (dir) {
      if (viewAs?.value === 'squid') {
        buildAlmSquidSalmpleLibrary(dir).then(setLib)
      } else if (viewAs?.value === 'rample') {
        buildSquarpRampleLibrary(dir).then(setLib)
      } else if (viewAs?.value === 'qd') {
        buildVpmeQuadDrumLibrary(dir).then(setLib)
      }
    }
  }, [dir, viewAs?.value])

  return (
    <Stack grow={'fill'} space={'space.100'}>
      <Inline space={'space.050'}>
        <Button onClick={selectDirectory}>{'Select directory'}</Button>
        <Select
          spacing={'compact'}
          options={[
            { label: 'File System', value: 'fs' },
            { label: 'ALM Squid Salmple', value: 'squid' },
            { label: 'Squarp Rample', value: 'rample' },
            { label: 'vpme.de Quad Drum', value: 'qd' },
          ]}
          placeholder={'View as'}
          onChange={setViewAs}
          value={viewAs}
        />
      </Inline>
      {dir && viewAs?.value === 'fs' ? (
        <FsBrowser rootDir={dir} />
      ) : lib ? (
        <LibraryBrowser library={lib} />
      ) : (
        'nothing to show'
      )}
    </Stack>
  )
}
