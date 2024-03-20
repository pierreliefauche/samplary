import { Group } from '@mantine/core'
import { Browser } from '../types'
import { BanksList } from './BanksList'
import { useState } from 'react'
import { Bank } from './Bank'

export const AlmSquidSalmpleBrowser: Browser = ({ rootDirHandle }) => {
  const [selectedBankNumber, setSelectedBankNumber] = useState<number>(1)

  return (
    <Group bg={'yellow'} mah={'100%'} grow>
      <BanksList
        rootDirHandle={rootDirHandle}
        selectedBankNumber={selectedBankNumber}
        onSelectBankNumber={setSelectedBankNumber}
      />
      <Bank rootDirHandle={rootDirHandle} bankNumber={selectedBankNumber} />
    </Group>
  )
}
