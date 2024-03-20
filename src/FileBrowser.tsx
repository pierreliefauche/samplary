import { Button, Stack } from '@mantine/core'
import { useCallback, useState } from 'react'
import { AlmSquidSalmpleBrowser } from './browsers/alm-squid-salmple'

export default function FileBrowser() {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle>()

  const selectDirectory = useCallback(async () => {
    return window.showDirectoryPicker().then(setDirHandle)
  }, [setDirHandle])

  return (
    <Stack mah={300}>
      <Button onClick={selectDirectory}>{dirHandle?.name || 'Select Directory'}</Button>
      {!!dirHandle && <AlmSquidSalmpleBrowser rootDirHandle={dirHandle} />}
    </Stack>
  )
}
