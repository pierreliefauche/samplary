import { ComponentProps } from 'react'
import { SamplesList } from './SamplesList'
import { Outer } from './styled'
import { Header } from './Header'

type BankProps = Omit<ComponentProps<typeof Outer>, 'children'> & {
  bankKey: string
}

export const Bank = ({ bankKey, ...props }: BankProps) => {
  return (
    <Outer {...props}>
      <Header bankKey={bankKey} />
      <SamplesList bankKey={bankKey} />
    </Outer>
  )
}
