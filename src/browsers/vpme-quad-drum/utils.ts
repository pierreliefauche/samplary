import { cloneDeep, range } from 'lodash'
import { FsDir, hydrateChildren, isFsDir, isWavFile } from '../../file-system'
import { Bank, Library as BaseLibrary, Group } from '../types'

export type VpmeQuadDrumLibrary = BaseLibrary

const BANK_NAME_DIR_NAME_REGEXP = /^([0-3]\d|4[0-8])(\D.*)$/

const GROUP_KEYS = ['cyan', 'pink', 'orange'] as const
// type GroupKey = typeof GROUP_KEYS[number]

const getBankGroupIndex = (bankNumber: number | string): number => {
  bankNumber = Number(bankNumber)
  return Math.ceil(bankNumber / 16) - 1
}

export const MOCK_LIBRARY: VpmeQuadDrumLibrary = Object.freeze({
  groups: GROUP_KEYS.map(
    (groupKey, groupIndex): Group<VpmeQuadDrumLibrary> => ({
      key: groupKey,
      isNamable: false,
      name: groupKey,
      isEmpty: true,
      banks: range(1 + 16 * groupIndex, 17 + 16 * groupIndex).map((bankNumber): Bank<VpmeQuadDrumLibrary> => ({
        key: String(bankNumber),
        isNamable: true,
        isEmpty: true,
        voices: [{
          key: String(bankNumber),
          maxSamplesCount: 128,
          isEmpty: true,
          isNamable: false,
          samples: [],
        }]
      })),
    }),
  ),
})

export const buildLibrary = async (
  rootDir: FsDir,
): Promise<VpmeQuadDrumLibrary> => {
  await hydrateChildren(rootDir, { recursive: true })

  const library = cloneDeep(MOCK_LIBRARY)

  ;(rootDir.children || []).forEach((item) => {
    if (isFsDir(item)) {
      const [, bankNumber, bankName] = item.name.match(BANK_NAME_DIR_NAME_REGEXP) ?? []
      if (bankNumber && bankName) {
        const group = library.groups[getBankGroupIndex(bankNumber)]
        const bank = group?.banks.find(({ key }) => key === String(Number(bankNumber)))
        if (bank) {
          bank.name = bankName.replace(/_+/g, ' ').trim()

          ;(item.children || []).forEach((file) => {
            if (isWavFile(file)) {
              bank.voices[0]?.samples.push({
                key: file.name,
                fsFile: file
              })
            }
          })
        }
      }
    }
  })

  return library
}
