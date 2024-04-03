import { cloneDeep, range } from 'lodash'
import {
  FsDir,
  getItemAtPath,
  hydrateChildren,
  isFsDir,
  isFsFile,
  isWavFile,
  readTextValue,
} from '../../file-system'
import { Bank, Library as BaseLibrary, Voice } from '../types'

export type SquidSalmpleLibrary = BaseLibrary

const BANK_NAME_FILE = 'info.txt'

const bankDirName = (bankNumber: number): string => `Bank ${bankNumber}`
const legacySampleFileName = (sampleNumber: number | string): string =>
  `chan-00${sampleNumber}.wav`

export const MOCK_LIBRARY: SquidSalmpleLibrary = Object.freeze({
  groups: [
    {
      key: '0',
      isNamable: false,
      isEmpty: false,
      banks: range(1, 100).map(
        (bankNumber): Bank<SquidSalmpleLibrary> => ({
          key: bankDirName(bankNumber),
          isNamable: true,
          isEmpty: true,
          voices: range(1, 9).map(
            (voiceNumber): Voice<SquidSalmpleLibrary> => ({
              key: String(voiceNumber),
              maxSamplesCount: 1,
              isEmpty: true,
              isNamable: true,
              samples: [
                {
                  key: '0',
                  fsFile: undefined,
                },
              ],
            }),
          ),
        }),
      ),
    },
  ],
})

// const cleanName = (name: string): string => {
//   return name
//     .replace(/[^a-z0-9_-]/gi, ' ')
//     .trimStart()
//     .substring(0, 8)
// }

export const buildLibrary = async (
  rootDir: FsDir,
): Promise<SquidSalmpleLibrary> => {
  await hydrateChildren(rootDir, { recursive: true })

  const library = cloneDeep(MOCK_LIBRARY)

  await Promise.all(
    library.groups[0].banks.map(async (bank) => {
      const bankDir = await getItemAtPath(rootDir, [bank.key])
      if (!isFsDir(bankDir)) {
        return
      }

      bank.isEmpty = false

      const bankNameFile = await getItemAtPath(bankDir, [BANK_NAME_FILE])
      if (isFsFile(bankNameFile)) {
        bank.name = await readTextValue(bankNameFile)
      }

      await Promise.all(
        bank.voices.map(async (voice) => {
          const voiceDir = await getItemAtPath(bankDir, [voice.key])
          const sampleFile =
            (isFsDir(voiceDir) && voiceDir.children?.find(isWavFile)) ||
            (await getItemAtPath(bankDir, [legacySampleFileName(voice.key)]))
          if (isWavFile(sampleFile)) {
            voice.isEmpty = false
            voice.samples[0].fsFile = sampleFile
            const name = sampleFile?.name.split('.wav')[0]
            if (name && !name?.startsWith('chan-00')) {
              voice.name = name
            }
          }
        }),
      )
    }),
  )

  return library
}
