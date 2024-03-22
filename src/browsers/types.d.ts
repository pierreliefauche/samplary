import { ComponentProps, FunctionComponent } from 'react'
import { FsItem } from '../file-system'

type BrowserProps = ComponentProps<'div'> & {
  rootDir: FsItem
}

type Browser = FunctionComponent<BrowserProps>
