import { Library } from '../../browsers/types'
import { Inline } from '@atlaskit/primitives'
import { useMemo, useState } from 'react'
import { BanksList } from './BanksList'
import { Bank } from './Bank'

type LibraryBrowserProps = {
  library: Library
}

export const LibraryBrowser = ({ library }: LibraryBrowserProps) => {
  const [selectedBankKey, setSelectedBankKey] = useState<string>(
    library.groups[0]?.banks[0]?.key,
  )

  const selectedBank = useMemo(() => {
    for (const group of library.groups) {
      for (const bank of group.banks || []) {
        if (bank.key === selectedBankKey) {
          return bank
        }
      }
    }
  }, [library, selectedBankKey])

  return (
    <Inline alignBlock={'stretch'} grow={'fill'}>
      <BanksList
        library={library}
        selectedBankKey={selectedBankKey}
        onSelectBankKey={setSelectedBankKey}
      />
      <Bank.Outer>{!!selectedBank && <Bank bank={selectedBank} />}</Bank.Outer>
    </Inline>
  )
}
