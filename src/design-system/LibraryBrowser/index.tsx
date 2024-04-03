import { Fragment } from 'react/jsx-runtime'
import { Library } from '../../browsers/types'
import { List } from '../List'
import { Inline } from '@atlaskit/primitives'
import { Scrollable } from '../Scrollable'
import Heading from '@atlaskit/heading'

type LibraryBrowserProps = {
  library: Library
}

export const LibraryBrowser = ({ library }: LibraryBrowserProps) => {
  return (
    <Inline alignBlock={'stretch'}>
      <List>
        <Scrollable>
          {library.groups.map((group) => (
            <Fragment key={group.key}>
              <List.SectionHeader>
                <Heading size={'xxsmall'}>{group.name || group.key}</Heading>
              </List.SectionHeader>
              {group.banks.map((bank) => (
                <List.Item key={bank.key}>{bank.name || bank.key}</List.Item>
              ))}
            </Fragment>
          ))}
        </Scrollable>
      </List>
    </Inline>
  )
}
