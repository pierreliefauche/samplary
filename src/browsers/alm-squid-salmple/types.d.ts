import { FsItem } from '../../file-system'

type Sample = {
  number: string
  exdists: boolean
  name: string | undefined
  fsItem: FsItem | undefined
}

type Bank = {
  number: string
  exists: boolean
  name:
    | undefined
    | {
        value: string
      }
  samples: Record<string, Sample>
}

type Library = {
  fs: FsItem | undefined
  banks: Record<string, Bank>
}
