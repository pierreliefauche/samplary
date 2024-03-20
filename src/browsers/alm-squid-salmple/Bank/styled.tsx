import { Box, Flex, Heading } from "@radix-ui/themes"
import styled from "styled-components"

export const Outer = styled(Flex).attrs(() => ({
  p: "5",
  direction: "column",
}))`
  background: var(--gray-2);
  border-left: 1px var(--gray-5) solid;
  overflow: auto;
  flex: 1;
`

export const Header = styled(Box)``

export const Title = styled(Heading).attrs(() => ({
  size: "5",
}))``
