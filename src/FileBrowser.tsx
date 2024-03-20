import { useCallback, useState } from "react"
import { AlmSquidSalmpleBrowser } from "./browsers/alm-squid-salmple"
import { Button } from "@radix-ui/themes"

export default function FileBrowser() {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle>()

  const selectDirectory = useCallback(async () => {
    return window.showDirectoryPicker().then(setDirHandle)
  }, [setDirHandle])

  return (
    <>
      <Button onClick={selectDirectory}>
        {dirHandle?.name || "Select Directory"}
      </Button>
      {!!dirHandle && <AlmSquidSalmpleBrowser rootDirHandle={dirHandle} />}
    </>
  )
}
