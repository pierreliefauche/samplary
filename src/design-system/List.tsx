import { ReactNode } from 'react'
import { Box, Stack, xcss } from '@atlaskit/primitives'
import { token } from '@atlaskit/tokens'

type ListProps = {
  children: ReactNode
}

export const List = ({ ...stackProps }: ListProps) => {
  return <Stack {...stackProps} />
}

const itemStyles = xcss({
  cursor: 'pointer',
  ':hover': {
    background: token('color.background.neutral.subtle.hovered'),
  },
})

type ListItemProps = {
  children: ReactNode
}

List.Item = ({ ...boxProps }: ListItemProps) => {
  return <Box xcss={itemStyles} {...boxProps} />
}

const sectionStyles = xcss({
  position: 'sticky',
  top: token('space.0'),
  background: token('color.background.accent.gray.subtlest'),
})

type ListSectionHeaderProps = {
  children: ReactNode
}

List.SectionHeader = ({ ...boxProps }: ListSectionHeaderProps) => {
  return <Box xcss={sectionStyles} {...boxProps} />
}
