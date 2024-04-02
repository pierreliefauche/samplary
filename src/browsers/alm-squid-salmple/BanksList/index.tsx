import { BanksListItem } from './BanksListItem'
import { BanksListOuter } from './styled'
import { useLibrary } from '../useLibrary'
import { LeftSidebar, LeftSidebarWithoutResize } from '@atlaskit/page-layout'

type BanksListProps = {
  selectedBankNumber: string | undefined | null
  onSelectBankNumber: (bankNumber: string) => void
}

export const BanksList = ({
  selectedBankNumber,
  onSelectBankNumber,
}: BanksListProps) => {
  const [library] = useLibrary()

  return (
    <LeftSidebarWithoutResize width={250} isFixed>
      <BanksListOuter>
        {Object.keys(library?.banks).map((bankNumber) => (
          <BanksListItem
            key={bankNumber}
            bankNumber={bankNumber}
            isSelected={selectedBankNumber === bankNumber}
            onSelect={() => onSelectBankNumber(bankNumber)}
          />
        ))}
      </BanksListOuter>
    </LeftSidebarWithoutResize>
  )
}
