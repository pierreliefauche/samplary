import { Browser } from '../types'
import { BanksList } from './BanksList'
import { useEffect, useState } from 'react'
import { Bank } from './Bank'
import { Provider as LibraryProvider } from './useLibrary'
import { Library } from './types'
import { MOCK_LIBRARY, buildLibrary } from './utils'

export const AlmSquidSalmpleBrowser: Browser = ({ rootDir }) => {
  const [selectedBankNumber, setSelectedBankNumber] = useState<string>('1')
  const [library, setLibrary] = useState<Library>(MOCK_LIBRARY)

  useEffect(() => {
    buildLibrary(rootDir).then(setLibrary)
  }, [rootDir])

  return (
    <LibraryProvider value={[library]}>
        <BanksList
          selectedBankNumber={selectedBankNumber}
          onSelectBankNumber={setSelectedBankNumber}
        />
        <Bank key={selectedBankNumber} bankNumber={selectedBankNumber} />
    </LibraryProvider>
  )
}
