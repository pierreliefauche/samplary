import { ReactNode } from 'react'
import { Stack } from './Stack'
import { Box } from './Box'
import styled from 'styled-components'
import { token } from '@atlaskit/tokens'

type ListProps = {
  children: ReactNode
}

export const List = ({ ...stackProps }: ListProps) => {
  return <Stack {...stackProps} />
}

type ListItemProps = {
  children: ReactNode
}

List.Item = styled(({ ...boxProps }: ListItemProps) => {
  return <Box {...boxProps} />
})`
  &:hover {
    color: ${token('color.background.accent.blue.bolder')};
  }
`

type ListSectionHeaderProps = {
  children: ReactNode
}

List.SectionHeader = styled(({ ...boxProps }: ListSectionHeaderProps) => {
  return <Box {...boxProps} />
})`
  background: ${token('color.background.warning')};
  position: sticky;
`
