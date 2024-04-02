import { ComponentProps, FunctionComponent } from 'react'
import { FsDir, FsFile } from '../file-system'

type BrowserProps = ComponentProps<'div'> & {
  rootDir: FsDir
}

type Browser = FunctionComponent<BrowserProps>

export type Library<G = unknown, B = unknown, V = unknown, S = unknown> = {
  groups: Array<
    G & {
      key: string
      name?: string | null | undefined
      isNamable: boolean
      isEmpty: boolean

      banks: Array<
        B & {
          key: string
          name?: string | null | undefined
          isNamable: boolean
          isEmpty: boolean

          voices: Array<
            V & {
              key: string
              name?: string | null | undefined
              isNamable: boolean
              isEmpty: boolean
              maxSamplesCount: number

              samples: Array<
                S & {
                  key: string
                  fsFile: FsFile | undefined | null
                }
              >
            }
          >
        }
      >
    }
  >
}

export type Group<L extends Library> = Library['groups'][number]
export type Bank<L extends Library> = Group<L>['banks'][number]
export type Voice<L extends Library> = Bank<L>['voices'][number]
export type Sample<L extends Library> = Voice<L>['samples'][number]
