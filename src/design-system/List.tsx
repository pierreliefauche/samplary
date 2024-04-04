import { ReactNode } from 'react'
import { Box, Stack, xcss } from '@atlaskit/primitives'
import { token } from '@atlaskit/tokens'

const listStyles = xcss({ minWidth: '200px' })

type ListProps = {
  children: ReactNode
}

export const List = ({ ...stackProps }: ListProps) => {
  return <Stack xcss={listStyles} grow={'hug'} {...stackProps} />
}

const itemStyles = xcss({
  cursor: 'pointer',
  ':hover': {
    background: token('color.background.neutral.subtle.hovered'),
  },
  ':active': {
    background: token('color.background.neutral.subtle.pressed'),
  },
})

const itemSelectedStyles = xcss({
  background: token('color.background.selected'),
  color: 'color.text.selected',
  ':hover': {
    background: token('color.background.selected'),
  },
  borderLeft: `${token('border.width')} solid ${token('color.border.selected')}`,
})

type ListItemProps = {
  children: ReactNode
  isSelected?: boolean
  onSelect?: () => void
}

List.Item = ({ isSelected, onSelect, ...boxProps }: ListItemProps) => {
  return (
    <Box
      paddingBlock={'space.100'}
      paddingInline={'space.250'}
      xcss={[itemStyles, isSelected && itemSelectedStyles]}
      onClick={onSelect}
      {...boxProps}
    />
  )
}

const sectionStyles = xcss({
  position: 'sticky',
  top: token('space.0'),
  background: token('color.background.accent.gray.subtlest'),
  whiteSpace: 'nowrap',
})

type ListSectionHeaderProps = {
  children: ReactNode
}

List.SectionHeader = ({ ...boxProps }: ListSectionHeaderProps) => {
  return (
    <Box
      paddingBlock={'space.100'}
      paddingInline={'space.250'}
      xcss={sectionStyles}
      {...boxProps}
    />
  )
}
