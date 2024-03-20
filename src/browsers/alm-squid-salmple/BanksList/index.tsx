import { range } from "lodash"
import { BanksListItem } from "./BanksListItem"
import { BanksListOuter } from "./styled"

type BanksListProps = {
  rootDirHandle: FileSystemDirectoryHandle
  selectedBankNumber: number | undefined | null
  onSelectBankNumber: (bankNumber: number) => void
}

export const BanksList = ({
  rootDirHandle,
  selectedBankNumber,
  onSelectBankNumber,
}: BanksListProps) => {
  return (
    <BanksListOuter>
      {range(1, 100).map((bankNumber) => (
        <BanksListItem
          key={bankNumber}
          rootDirHandle={rootDirHandle}
          bankNumber={bankNumber}
          isSelected={selectedBankNumber === bankNumber}
          onSelect={() => onSelectBankNumber(bankNumber)}
        />
      ))}
    </BanksListOuter>
  )
}
