import '@atlaskit/css-reset'

import AppProvider from '@atlaskit/app-provider'
import { ComponentProps, FC, PropsWithChildren } from 'react'
import { Flex, xcss } from '@atlaskit/primitives'

const outerStyles = xcss({
  position: 'absolute',
  top: 'space.0',
  bottom: 'space.0',
  right: 'space.0',
  left: 'space.0',
  overflow: 'hidden',
})

const THEME: Partial<ComponentProps<typeof AppProvider>['defaultTheme']> = {
  light: 'light',
  dark: 'dark',
  UNSAFE_themeOptions: {
    brandColor: '#ff0000',
  },
}

export const AppWrapper: FC<Required<PropsWithChildren>> = ({
  children,
  ...props
}) => (
  <AppProvider defaultColorMode={'auto'} defaultTheme={THEME} {...props}>
    <Flex xcss={outerStyles}>{children}</Flex>
  </AppProvider>
)
