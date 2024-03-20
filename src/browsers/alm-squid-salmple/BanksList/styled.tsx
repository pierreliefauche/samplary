import { Flex, Text } from "@radix-ui/themes"
import styled, { css } from "styled-components"

export const ItemOuter = styled.div<{ isSelected: boolean }>`
  display: flex;
  text-align: center;
  padding: 0.3rem 0.5rem;
  align-items: center;
  cursor: pointer;
  border-left: 2px var(--gray-7) solid;

  &:hover {
    background: var(--accent-2);
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-left: 2px var(--accent-9) solid;
      background: var(--color-selection-root) !important;
    `}
`

export const BankNumber = styled(Text).attrs(() => ({
  size: "2",
  weight: "bold",
}))`
  /* font-weight: 700; */
  width: 1.5rem;
  margin-right: 1rem;
  text-align: right;
`

export const BankName = styled(Text).attrs(() => ({
  size: "1",
}))`
  /* font-weight: 200; */
  width: 5rem;
  text-align: justify;
`

export const BanksListOuter = styled(Flex).attrs(() => ({
  direction: "column",
  p: "0",
}))`
  overflow: auto;
`
