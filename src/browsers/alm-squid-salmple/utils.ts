import { fromPairs, range } from 'lodash'
import {
  FsItem,
  getItemAtPath,
  hydrateChildren,
  readTextAtPath,
} from '../../file-system'
import { isWavFileHandle } from '../../utils'
import { Library } from './types'

const BANK_NAME_FILE = 'info.txt'

export const MOCK_LIBRARY: Readonly<Library> = Object.freeze({
  fs: undefined,
  banks: {},
})

const bankDirName = (bankNumber: number): string => `Bank ${bankNumber}`
const legacySampleFileName = (sampleNumber: number): string =>
  `chan-00${sampleNumber}.wav`

const cleanName = (name: string): string => {
  return name
    .replace(/[^a-z0-9_-]/gi, ' ')
    .trimStart()
    .substring(0, 8)
}

export const buildLibrary = async (rootDir: FsItem): Promise<Library> => {
  await hydrateChildren(rootDir, true)

  return {
    fs: rootDir,
    banks: fromPairs(
      await Promise.all(
        range(1, 100).map(async (bankNumber) => {
          const bankFsItem = await getItemAtPath(rootDir, [
            bankDirName(bankNumber),
          ])
          const name = await readTextAtPath(rootDir, [
            bankDirName(bankNumber),
            BANK_NAME_FILE,
          ])
          return [
            bankNumber,
            {
              number: bankNumber,
              exists: !!bankFsItem,
              name,
              samples: fromPairs(
                await Promise.all(
                  range(1, 9).map(async (sampleNumber) => {
                    const sampleFsItem = await getItemAtPath(rootDir, [
                      bankDirName(bankNumber),
                      legacySampleFileName(sampleNumber),
                    ])
                    return [
                      sampleNumber,
                      {
                        number: sampleNumber,
                        exists: !!sampleFsItem,
                        name: undefined,
                        fsItem: undefined,
                      },
                    ]
                  }),
                ),
              ),
            },
          ]
        }),
      ),
    ),
  }
}

export const getBankDirHandle = (
  rootDirHandle: FileSystemDirectoryHandle,
  bankNumber: number,
): Promise<FileSystemDirectoryHandle> => {
  return rootDirHandle.getDirectoryHandle(bankDirName(bankNumber))
}

export const getBankName = async (
  bankDirHandle: FileSystemDirectoryHandle | undefined | null,
): Promise<string | undefined> => {
  if (!bankDirHandle) {
    return undefined
  }

  const bankNameFileHandle = await bankDirHandle.getFileHandle(BANK_NAME_FILE)
  const bankNameFile = await bankNameFileHandle?.getFile()
  const bankName = await bankNameFile?.text()

  return bankName
}

export const saveBankName = async (
  bankDirHandle: FileSystemDirectoryHandle,
  unsafeName: string,
): Promise<string> => {
  const name = cleanName(unsafeName)

  const bankNameFileHandle = await bankDirHandle.getFileHandle(BANK_NAME_FILE, {
    create: true,
  })
  const writable = await bankNameFileHandle.createWritable()
  await writable.write(name)
  await writable.close()
  return name
}

export const getSampleFileHandle = async (
  bankDirHandle: FileSystemDirectoryHandle,
  sampleNumber: number,
): Promise<FileSystemFileHandle | undefined> => {
  const [legacyFileHandle, sampleDirHandle] = await Promise.all([
    bankDirHandle
      .getFileHandle(legacySampleFileName(sampleNumber))
      .catch(console.error),
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
  sampleFileHandle: FileSystemFileHandle | undefined,
): string | undefined => {
  const name = sampleFileHandle?.name.split('.wav')[0]
  if (!name?.startsWith('chan-00')) {
    return name
  }
}

export const saveSampleName = async (
  bankDirHandle: FileSystemDirectoryHandle,
  sampleNumber: number,
  unsafeName: string,
): Promise<string> => {
  const name = `${cleanName(unsafeName)}.wav`

  const [legacyFileHandle, sampleDirHandle] = await Promise.all([
    bankDirHandle
      .getFileHandle(legacySampleFileName(sampleNumber))
      .catch(() => null),
    bankDirHandle.getDirectoryHandle(String(sampleNumber), { create: true }),
  ])

  if (legacyFileHandle) {
    // @ts-ignore
    await legacyFileHandle.move(sampleDirHandle, name)
  } else {
    for await (const fileHandle of sampleDirHandle.values()) {
      if (isWavFileHandle(fileHandle)) {
        // @ts-ignore
        fileHandle.move(name)
        break
      }
    }
  }

  return name
}
