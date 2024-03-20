import "@radix-ui/themes/styles.css"

import { Theme, ThemePanel } from "@radix-ui/themes"

import { Main, Shell } from "./components/layout/styled"
import FileBrowser from "./FileBrowser"

function App() {
  return (
    <Theme>
      <Shell>
        <Main>
          <FileBrowser />
        </Main>
      </Shell>
      <ThemePanel />
    </Theme>
  )
}

export default App
