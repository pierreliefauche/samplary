import { useCallback, useState } from 'react'
import { AlmSquidSalmpleBrowser } from './browsers/alm-squid-salmple'
import { FsItem, selectRootDirectory } from './file-system'
import Button from '@atlaskit/button/new'
import { Flex } from '@atlaskit/primitives'
import { Content, Main, PageLayout, TopNavigation } from '@atlaskit/page-layout'

export default function FileBrowser() {
  const [dir, setDir] = useState<FsItem>()

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
      <Content>{!!dir && <AlmSquidSalmpleBrowser rootDir={dir} />}</Content>
    </PageLayout>
  )
}
