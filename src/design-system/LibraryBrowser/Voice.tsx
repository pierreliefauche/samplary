import { Box, Stack } from '@atlaskit/primitives'
import { Voice as LibVoice, Library } from '../../browsers/types'
import Heading from '@atlaskit/heading'
import { Sample } from './Sample'

type VoiceProps = {
  voice: LibVoice<Library>
}

export const Voice = ({ voice }: VoiceProps) => {
  return (
    <Stack grow={'fill'}>
      <Box>
        <Heading size={'small'}>{voice.name || voice.key}</Heading>
      </Box>
      {voice.samples.map((sample) => (
        <Sample key={sample.key} sample={sample} />
      ))}
    </Stack>
  )
}
