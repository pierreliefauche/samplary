import '@atlaskit/css-reset'

import AppProvider from '@atlaskit/app-provider'
import { ComponentProps, FC, PropsWithChildren } from 'react'

const THEME: Partial<ComponentProps<typeof AppProvider>['defaultTheme']> = {
  light: 'light',
  dark: 'dark',
  UNSAFE_themeOptions: {
    brandColor: '#ff0000',
  },
}

export const AppWrapper: FC<Required<PropsWithChildren>> = (props) => (
  <AppProvider defaultColorMode={'auto'} defaultTheme={THEME} {...props} />
)
