// import { useEffect } from "react"
// import { getBankDirHandle, getBankName } from "../utils"
import { ItemOuter, BankNumber, BankName } from './styled'
import { useLibrary } from '../useLibrary'

type BanksListItemProps = {
  bankKey: string
  isSelected: boolean
  onSelect: () => void
}

export const BanksListItem = ({
  bankKey,
  isSelected,
  onSelect,
}: BanksListItemProps) => {
  const [library] = useLibrary()

  const bank = library.groups[0]?.banks.find(({ key }) => key === bankKey)

  return (
    <ItemOuter isSelected={isSelected} onClick={onSelect}>
      <BankNumber>{bankKey}</BankNumber>
      <BankName>{bank?.name || (bank?.isEmpty ? 'empty' : 'no name')}</BankName>
    </ItemOuter>
  )
}
