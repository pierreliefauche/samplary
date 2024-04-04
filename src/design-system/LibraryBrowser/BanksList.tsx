import { Fragment } from 'react/jsx-runtime'
import { Library } from '../../browsers/types'
import { List } from '../List'
import { Scrollable } from '../Scrollable'
import Heading from '@atlaskit/heading'

type BanksListProps = {
  library: Library
  selectedBankKey: string | null | undefined
  onSelectBankKey: (bankKey: string) => void
}

export const BanksList = ({
  selectedBankKey,
  onSelectBankKey,
  library,
}: BanksListProps) => {
  return (
    <List>
      <Scrollable>
        {library.groups.map((group) => (
          <Fragment key={group.key}>
            <List.SectionHeader>
              <Heading size={'xxsmall'}>{group.name || group.key}</Heading>
            </List.SectionHeader>
            {group.banks.map((bank) => (
              <List.Item
                key={bank.key}
                isSelected={selectedBankKey === bank.key}
                onSelect={() => onSelectBankKey(bank.key)}
              >
                {bank.name || bank.key}
              </List.Item>
            ))}
          </Fragment>
        ))}
      </Scrollable>
    </List>
  )
}
