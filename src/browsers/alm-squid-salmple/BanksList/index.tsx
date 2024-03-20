import { ScrollArea, Stack } from '@mantine/core'
import { range } from 'lodash'
import { BanksListItem } from './BanksListItem'

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
    <ScrollArea h={'100%'}>
      <Stack gap={'xs'}>
        {range(1, 100).map((bankNumber) => (
          <BanksListItem
            key={bankNumber}
            rootDirHandle={rootDirHandle}
            bankNumber={bankNumber}
            isSelected={selectedBankNumber === bankNumber}
            onSelect={() => onSelectBankNumber(bankNumber)}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
