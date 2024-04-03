import { Library } from '../../browsers/types'
import { Inline } from '../Inline'
import { List } from '../List'

type LibraryBrowserProps = {
  library?: Library
}

export const LibraryBrowser = ({ library }: LibraryBrowserProps) => {
  return (
    <Inline>
      <List>
        <List.SectionHeader>{'coucou'}</List.SectionHeader>
        <List.Item>{library ? 'dede' : 'de'}</List.Item>
      </List>
    </Inline>
  )
}
