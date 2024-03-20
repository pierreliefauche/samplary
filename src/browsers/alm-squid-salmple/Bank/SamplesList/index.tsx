import { range } from "lodash"
import { SamplesListItem } from "./SamplesListItem"
import { ComponentProps } from "react"
import { Outer } from "./styled"

type SamplesListProps = ComponentProps<typeof Outer> & {
  bankDirHandle: FileSystemDirectoryHandle
}

export const SamplesList = ({ bankDirHandle }: SamplesListProps) => {
  return (
    <Outer>
      {range(1, 9).map((sampleNumber) => (
        <SamplesListItem
          key={sampleNumber}
          bankDirHandle={bankDirHandle}
          sampleNumber={sampleNumber}
        />
      ))}
    </Outer>
  )
}
