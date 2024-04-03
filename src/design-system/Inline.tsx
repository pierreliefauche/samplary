import { Inline as AkInline } from '@atlaskit/primitives'

import { ReactNode } from 'react'

type InlineProps = {
  children: ReactNode
}

export const Inline = ({ ...akProps }: InlineProps) => {
  return <AkInline {...akProps} />
}
