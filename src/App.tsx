import '@mantine/core/styles.css'

import { Button, MantineProvider } from '@mantine/core'

const INDENT = '—'

const printDirectory = async (dirHandle: FileSystemDirectoryHandle, indent = INDENT): Promise<void> => {
    for await (const entry of dirHandle.values()) {
        console.log(indent, entry.name)
        if (entry.kind === 'directory') {
            await printDirectory(entry, indent + INDENT)
        }
    }
}


const run = async () => {
    const dirHandle = await window.showDirectoryPicker();
    return printDirectory(dirHandle)
}

run().catch(console.error)

function App() {
  return (
    <MantineProvider>
      <Button onClick={run}>Do it</Button>
    </MantineProvider>
  )
}

export default App
