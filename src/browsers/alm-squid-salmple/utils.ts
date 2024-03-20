import { isWavFileHandle } from '../../utils'

const BANK_NAME_FILE = 'info.txt'

const bankDirName = (bankNumber: number): string => `Bank ${bankNumber}`
const legacySampleFileName = (sampleNumber: number): string => `chan-00${sampleNumber}.wav`

export const getBankDirHandle = (
  rootDirHandle: FileSystemDirectoryHandle,
  bankNumber: number
): Promise<FileSystemDirectoryHandle> => {
  return rootDirHandle.getDirectoryHandle(bankDirName(bankNumber))
}

export const getBankName = async (
  bankDirHandle: FileSystemDirectoryHandle | undefined | null
): Promise<string | undefined> => {
  if (!bankDirHandle) {
    return undefined
  }

  const bankNameFileHandle = await bankDirHandle.getFileHandle(BANK_NAME_FILE)
  const bankNameFile = await bankNameFileHandle?.getFile()
  const bankName = await bankNameFile?.text()

  return bankName
}

export const getSampleFileHandle = async (
  bankDirHandle: FileSystemDirectoryHandle,
  sampleNumber: number
): Promise<FileSystemFileHandle | undefined> => {
  const [legacyFileHandle, sampleDirHandle] = await Promise.all([
    bankDirHandle.getFileHandle(legacySampleFileName(sampleNumber)).catch(console.error),
    bankDirHandle.getDirectoryHandle(String(sampleNumber)).catch(console.error),
  ])

  if (legacyFileHandle) {
    return legacyFileHandle
  }

  if (sampleDirHandle) {
    for await (const fileHandle of sampleDirHandle.values()) {
      if (isWavFileHandle(fileHandle)) {
        return fileHandle
      }
    }
  }
}

export const getSampleName = (
  sampleFileHandle: FileSystemFileHandle | undefined
): string | undefined => {
  const name = sampleFileHandle?.name.split('.wav')[0]
  if (!name?.startsWith('chan-00')) {
    return name
  }
}
