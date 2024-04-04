import { Box, Stack, xcss } from '@atlaskit/primitives'
import { Bank as LibBank, Library } from '../../browsers/types'
import { ComponentProps } from 'react'
import PageHeader from '@atlaskit/page-header'
import { Scrollable } from '../Scrollable'
import { Voice } from './Voice'

const paddingInlineStyles = xcss({
  paddingInline: 'space.300',
})

const voicesStackStyles = xcss({
  paddingBlockEnd: 'space.400',
})

type BankProps = {
  bank: LibBank<Library>
}

export const Bank = ({ bank }: BankProps) => {
  return (
    <>
      <Box xcss={[paddingInlineStyles]}>
        <PageHeader>{bank.name || bank.key}</PageHeader>
      </Box>
      <Scrollable>
        <Stack
          grow={'fill'}
          space={'space.400'}
          xcss={[paddingInlineStyles, voicesStackStyles]}
        >
          {bank.voices.map((voice) => (
            <Voice key={voice.key} voice={voice} />
          ))}
        </Stack>
      </Scrollable>
    </>
  )
}

const outerStyles = xcss({
  borderColor: 'color.border',
  borderStyle: 'solid',
  borderWidth: 'border.width.0',
  borderLeftWidth: 'border.width',
  backgroundColor: 'color.background.neutral',
})

Bank.Outer = (props: ComponentProps<typeof Stack>) => {
  return <Stack grow={'fill'} xcss={[outerStyles]} {...props} />
}
