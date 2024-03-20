import { BoxComponentProps, Stack } from '@mantine/core'
import { range } from 'lodash'
import { SamplesListItem } from './SamplesListItem'

type SamplesListProps = BoxComponentProps & {
  bankDirHandle: FileSystemDirectoryHandle
}

export const SamplesList = ({ bankDirHandle }: SamplesListProps) => {
  return (
    <Stack>
      {range(1, 9).map((sampleNumber) => (
        <SamplesListItem
          key={sampleNumber}
          bankDirHandle={bankDirHandle}
          sampleNumber={sampleNumber}
        />
      ))}
    </Stack>
  )
}
