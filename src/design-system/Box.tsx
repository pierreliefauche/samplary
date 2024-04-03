import { Box as AkBox } from '@atlaskit/primitives'

import { ReactNode } from 'react'
import styled from 'styled-components'

type BoxProps = {
  children?: ReactNode
  className?: string
}

export const Box = styled(({ ...akProps }: BoxProps) => {
  return <AkBox padding={'space.200'} {...akProps} />
})`
  display: flex;
`
