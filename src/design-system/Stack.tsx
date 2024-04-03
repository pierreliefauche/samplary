import { Stack as AkStack } from '@atlaskit/primitives'

import { ReactNode } from 'react'

type StackProps = {
  children: ReactNode
}

export const Stack = ({ ...akProps }: StackProps) => {
  return <AkStack {...akProps} />
}
