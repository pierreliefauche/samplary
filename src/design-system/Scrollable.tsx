import { Box, xcss } from '@atlaskit/primitives'
import { ComponentProps } from 'react'

const styles = xcss({
  overflow: 'auto',
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 0,
})

type ScrollableProps = ComponentProps<typeof Box>

export const Scrollable = (props: ScrollableProps) => {
  return <Box xcss={[styles]} {...props} />
}
