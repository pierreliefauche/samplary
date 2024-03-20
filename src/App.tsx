import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import AppShell from './AppShell'

function App() {
  return (
    <MantineProvider>
      <AppShell />
    </MantineProvider>
  )
}

export default App
