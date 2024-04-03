import { BanksList } from './BanksList'
import { ComponentProps, useEffect, useState } from 'react'
import { Bank } from './Bank'
import { Provider as LibraryProvider } from './useLibrary'
import { MOCK_LIBRARY, SquidSalmpleLibrary, buildLibrary } from './utils'
import { FsDir } from '../../file-system'

type BrowserProps = ComponentProps<'div'> & {
  rootDir: FsDir
}

export const Browser = ({ rootDir }: BrowserProps) => {
  const [library, setLibrary] = useState<SquidSalmpleLibrary>(MOCK_LIBRARY)
  const [selectedBankKey, setSelectedBankKey] = useState<string>(
    library.groups[0]?.banks[0]?.key,
  )

  useEffect(() => {
    buildLibrary(rootDir).then((l) => {
      setLibrary(l)
      setSelectedBankKey(l.groups[0]?.banks[0]?.key)
    })
  }, [rootDir])

  return (
    <LibraryProvider value={[library]}>
      <BanksList
        selectedBankKey={selectedBankKey}
        onSelectBankKey={setSelectedBankKey}
      />
      <Bank key={selectedBankKey} bankKey={selectedBankKey} />
    </LibraryProvider>
  )
}
