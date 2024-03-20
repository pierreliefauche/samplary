import { Box, BoxComponentProps, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { getBankDirHandle, getBankName } from '../utils'
import { SamplesList } from './SamplesList'

type BankProps = BoxComponentProps & {
  rootDirHandle: FileSystemDirectoryHandle
  bankNumber: number
}

export const Bank = ({ rootDirHandle, bankNumber }: BankProps) => {
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
    <Stack bg={'cyan'}>
      <Box>{`Bank ${bankNumber}: ${bankName}`}</Box>
      {!!dirHandle && <SamplesList bankDirHandle={dirHandle} />}
    </Stack>
  )
}
