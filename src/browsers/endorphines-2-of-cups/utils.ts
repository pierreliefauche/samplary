import { cloneDeep, range } from 'lodash'
import { FsDir, hydrateChildren, isFsDir, isHiddenFsItem, isWavFile } from '../../file-system'
import { Bank, Library as BaseLibrary, Group, Voice } from '../types'

export type EndorphinesTwoOfCupsLibrary = BaseLibrary

const BANK_DIR_NAME_REGEXP = /^bank([1-8])$/
const VOICE_DIR_NAME_REGEXP = /^voice(1|2)$/

const GROUP_KEYS = ['blue', 'red'] as const

const getBankGroupIndex = (bankNumber: string | number): number => {
  bankNumber = Number(bankNumber)
  return Math.ceil(bankNumber / 4) - 1
}

export const MOCK_LIBRARY: EndorphinesTwoOfCupsLibrary = Object.freeze({
  groups: GROUP_KEYS.map(
    (groupKey, groupIndex): Group<EndorphinesTwoOfCupsLibrary> => ({
      key: groupKey,
      isNamable: false,
      name: groupKey,
      isEmpty: true,
      banks: range(1 + 4 * groupIndex, 5 + 4 * groupIndex).map((bankNumber): Bank<EndorphinesTwoOfCupsLibrary> => ({
        key: `bank${bankNumber}`,
        isNamable: false,
        isEmpty: true,
        voices: range(1, 3).map((voiceNumber): Voice<EndorphinesTwoOfCupsLibrary> => ({
          key: `voice${voiceNumber}`,
          maxSamplesCount: 24,
          isEmpty: true,
          isNamable: false,
          samples: [],
        }))
      })),
    }),
  ),
})

export const buildLibrary = async (
  rootDir: FsDir,
): Promise<EndorphinesTwoOfCupsLibrary> => {
  await hydrateChildren(rootDir, { recursive: true })

  const library = cloneDeep(MOCK_LIBRARY)

  ;(rootDir.children || []).forEach((item) => {
    if (isFsDir(item)) {
      const [bankKey, bankNumber] = item.name.match(BANK_DIR_NAME_REGEXP) ?? []
      if (bankKey) {
        const group = library.groups[getBankGroupIndex(bankNumber)]
        const bank = group?.banks.find(({ key }) => key === bankKey)
        if (bank) {
          group.isEmpty = false
          bank.isEmpty = false

          ;(item.children || []).forEach((voiceDir) => {
            if (isFsDir(voiceDir)) {
              const [voiceKey] = voiceDir.name.match(VOICE_DIR_NAME_REGEXP) || []
              if (voiceKey) {
                const voice = bank.voices.find(({ key }) => key === voiceKey)
                if (voice) {
                  (voiceDir.children || []).forEach((sampleFile) => {
                    if (isWavFile(sampleFile) && !isHiddenFsItem(sampleFile)) {
                      voice.isEmpty = false
                      voice.samples.push({
                        key: sampleFile.name,
                        fsFile: sampleFile,
                      })
                    }
                  })
                }
              }
            }
          })
        }
      }
    }
  })

  return library
}
