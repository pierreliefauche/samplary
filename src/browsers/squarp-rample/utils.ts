import { cloneDeep, range } from 'lodash'
import { FsDir, hydrateChildren, isFsFile, isWavFile } from '../../file-system'
import { Bank, Library as BaseLibrary, Voice } from '../types'

export type SquarpRampleLibrary = BaseLibrary

const GROUP_NAME_FILE_NAME_REGEXP = /^([A-Z]) - (.+)\.rtf$/i
const BANK_NAME_REGEXP = /^([A-Z])((?:1)?\d?\d)$/i

export const MOCK_LIBRARY: SquarpRampleLibrary = Object.freeze({
  groups: range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1).map(
    (groupCharCode) => ({
      key: String.fromCharCode(groupCharCode),
      isNamable: true,
      name: String.fromCharCode(groupCharCode),
      isEmpty: true,
      banks: [],
    }),
  ),
})

export const buildLibrary = async (
  rootDir: FsDir,
): Promise<SquarpRampleLibrary> => {
  await hydrateChildren(rootDir, { recursive: true })

  const library = cloneDeep(MOCK_LIBRARY)

  ;(rootDir.children || []).forEach((item) => {
    if (isFsFile(item)) {
      const [, groupKey, name] =
        item.name.match(GROUP_NAME_FILE_NAME_REGEXP) ?? []
      if (groupKey && name) {
        const group = library.groups.find(({ key }) => key === groupKey)
        if (group) {
          group.name = name
        }
      }
    } else {
      const [bankKey, groupKey] = item.name.match(BANK_NAME_REGEXP) ?? []
      const group = library.groups.find(({ key }) => key === groupKey)
      if (bankKey && group) {
        const bank: Bank<SquarpRampleLibrary> = {
          key: bankKey,
          name: bankKey,
          isNamable: false,
          isEmpty: false,
          voices: range(1, 5).map(
            (voiceNumber): Voice<SquarpRampleLibrary> => ({
              key: String(voiceNumber),
              maxSamplesCount: 12,
              isEmpty: true,
              isNamable: false,
              samples: [],
            }),
          ),
        }
        group.banks.push(bank)
        ;(item.children || []).forEach((file) => {
          if (isWavFile(file)) {
            const voiceKey = file.name.charAt(0)
            const voice = bank.voices.find(({ key }) => key === voiceKey)
            if (voice) {
              voice.samples.push({
                key: file.name,
                fsFile: file,
              })
            }
          }
        })
      }
    }
  })

  // await Promise.all(
  //   library.groups[0].banks.map(async (bank) => {
  //     const bankDir = await getItemAtPath(rootDir, [bank.key])
  //     if (!isFsDir(bankDir)) {
  //       return
  //     }

  //     bank.isEmpty = false

  //     const bankNameFile = await getItemAtPath(bankDir, [BANK_NAME_FILE])
  //     if (isFsFile(bankNameFile)) {
  //       bank.name = await readTextValue(bankNameFile)
  //     }

  //     await Promise.all(
  //       bank.voices.map(async (voice) => {
  //         const voiceDir = await getItemAtPath(bankDir, [voice.key])
  //         const sampleFile =
  //           (isFsDir(voiceDir) && voiceDir.children?.find(isWavFile)) ||
  //           (await getItemAtPath(bankDir, [legacySampleFileName(voice.key)]))
  //         if (isWavFile(sampleFile)) {
  //           voice.isEmpty = false
  //           voice.samples[0].fsFile = sampleFile
  //           const name = sampleFile?.name.split('.wav')[0]
  //           if (name && !name?.startsWith('chan-00')) {
  //             voice.name = name
  //           }
  //         }
  //       }),
  //     )
  //   }),
  // )

  return library
}
