import { BanksListItem } from './BanksListItem'
import { BanksListOuter } from './styled'
import { useLibrary } from '../useLibrary'
import { LeftSidebarWithoutResize } from '@atlaskit/page-layout'

type BanksListProps = {
  selectedBankKey: string | undefined | null
  onSelectBankKey: (bankKey: string) => void
}

export const BanksList = ({
  selectedBankKey,
  onSelectBankKey,
}: BanksListProps) => {
  const [library] = useLibrary()

  return (
    <LeftSidebarWithoutResize width={250} isFixed>
      <BanksListOuter>
        {library?.groups[0].banks.map((bank) => (
          <BanksListItem
            key={bank.key}
            bankKey={bank.key}
            isSelected={selectedBankKey === bank.key}
            onSelect={() => onSelectBankKey(bank.key)}
          />
        ))}
      </BanksListOuter>
    </LeftSidebarWithoutResize>
  )
}
