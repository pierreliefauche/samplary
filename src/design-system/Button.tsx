import AkButton from '@atlaskit/button/new'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
}

export const Button = ({ ...akProps }: ButtonProps) => {
  return <AkButton {...akProps} />
}
