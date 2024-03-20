import { ComponentProps, FunctionComponent } from 'react'

type BrowserProps = ComponentProps<'div'> & {
  rootDirHandle: FileSystemDirectoryHandle
}

type Browser = FunctionComponent<BrowserProps>
