import { Browser } from "../types"
import { BanksList } from "./BanksList"
import { useState } from "react"
import { Bank } from "./Bank"
import { BrowserOuter } from "./styled"

export const AlmSquidSalmpleBrowser: Browser = ({ rootDirHandle }) => {
  const [selectedBankNumber, setSelectedBankNumber] = useState<number>(1)

  return (
    <BrowserOuter>
      <BanksList
        rootDirHandle={rootDirHandle}
        selectedBankNumber={selectedBankNumber}
        onSelectBankNumber={setSelectedBankNumber}
      />
      <Bank
        key={selectedBankNumber}
        rootDirHandle={rootDirHandle}
        bankNumber={selectedBankNumber}
      />
    </BrowserOuter>
  )
}
