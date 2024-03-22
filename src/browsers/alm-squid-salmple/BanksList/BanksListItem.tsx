// import { useEffect } from "react"
// import { getBankDirHandle, getBankName } from "../utils"
import { ItemOuter, BankNumber, BankName } from './styled'
import { useLibrary } from '../useLibrary'

type BanksListItemProps = {
  bankNumber: string
  isSelected: boolean
  onSelect: () => void
}

export const BanksListItem = ({
  bankNumber,
  isSelected,
  onSelect,
}: BanksListItemProps) => {
  const [library] = useLibrary()

  const bank = library.banks[bankNumber]

  return (
    <ItemOuter isSelected={isSelected} onClick={onSelect}>
      <BankNumber>{bankNumber}</BankNumber>
      <BankName>{bank.name || (bank.exists ? 'no name' : '')}</BankName>
    </ItemOuter>
  )
}
