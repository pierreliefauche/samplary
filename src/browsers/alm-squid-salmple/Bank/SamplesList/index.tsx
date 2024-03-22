import { range } from 'lodash'
import { SamplesListItem } from './SamplesListItem'
import { ComponentProps } from 'react'
import { Outer } from './styled'

type SamplesListProps = ComponentProps<typeof Outer> & {
  bankNumber: string
}

export const SamplesList = ({ bankNumber }: SamplesListProps) => {
  return (
    <Outer>
      {range(1, 9).map((sampleNumber) => (
        <SamplesListItem
          key={sampleNumber}
          bankNumber={bankNumber}
          sampleNumber={String(sampleNumber)}
        />
      ))}
    </Outer>
  )
}
