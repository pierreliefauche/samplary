import { ComponentProps, useEffect, useState } from "react"
import { getBankDirHandle, getBankName } from "../utils"
import { SamplesList } from "./SamplesList"
import { Outer, Header, Title } from "./styled"

type BankProps = ComponentProps<typeof Outer> & {
  rootDirHandle: FileSystemDirectoryHandle
  bankNumber: number
}

export const Bank = ({ rootDirHandle, bankNumber, ...props }: BankProps) => {
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
    <Outer {...props}>
      <Header>
        <Title>{`Bank ${bankNumber}: ${bankName}`}</Title>
      </Header>
      {!!dirHandle && <SamplesList bankDirHandle={dirHandle} />}
    </Outer>
  )
}
