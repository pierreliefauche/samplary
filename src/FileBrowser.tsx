import { useCallback, useState } from 'react'
import { Browser as LibraryBrowser } from './browsers/alm-squid-salmple'
import { FsDir, selectRootDirectory } from './file-system'
import Button from '@atlaskit/button/new'
import { Content, PageLayout, TopNavigation } from '@atlaskit/page-layout'

export default function FileBrowser() {
  const [dir, setDir] = useState<FsDir>()

  const selectDirectory = useCallback(async () => {
    return selectRootDirectory().then(setDir)
  }, [setDir])

  return (
    <PageLayout>
      <TopNavigation>
        <Button onClick={selectDirectory} appearance='primary'>
          {dir?.name || 'Select Directory'}
        </Button>
      </TopNavigation>
      <Content>{!!dir && <LibraryBrowser rootDir={dir} />}</Content>
    </PageLayout>
  )
}
