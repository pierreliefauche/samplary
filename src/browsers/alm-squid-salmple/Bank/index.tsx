import { ComponentProps} from 'react'
import { SamplesList } from './SamplesList'
import { Outer } from './styled'
import { Header } from './Header'

type BankProps = ComponentProps<typeof Outer> & {
  bankNumber: string
}

export const Bank = ({ bankNumber, ...props }: BankProps) => {
  return (
    <Outer {...props}>
      <Header bankNumber={bankNumber} />
      <SamplesList bankNumber={bankNumber} />
    </Outer>
  )
}
