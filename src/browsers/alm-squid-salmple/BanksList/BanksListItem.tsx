import { useEffect, useState } from "react"
import { getBankDirHandle, getBankName } from "../utils"
import { ItemOuter, BankNumber, BankName } from "./styled"

type BanksListItemProps = {
  rootDirHandle: FileSystemDirectoryHandle
  bankNumber: number
  isSelected: boolean
  onSelect: () => void
}

export const BanksListItem = ({
  bankNumber,
  rootDirHandle,
  isSelected,
  onSelect,
}: BanksListItemProps) => {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle>()
  const [bankName, setBankName] = useState<string>()

  useEffect(() => {
    getBankDirHandle(rootDirHandle, bankNumber)
      .then((dirHandle) => {
        setDirHandle(dirHandle)
        return getBankName(dirHandle)
      })
      .then(setBankName)
  }, [setDirHandle, setBankName, rootDirHandle, bankNumber])

  return (
    <ItemOuter isSelected={isSelected} onClick={onSelect}>
      <BankNumber>{bankNumber}</BankNumber>
      <BankName>{bankName ?? (dirHandle ? "no name" : "")}</BankName>
    </ItemOuter>
  )
}
