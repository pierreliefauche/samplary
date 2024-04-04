import { Box } from '@atlaskit/primitives'
import { Sample as LibSample, Library } from '../../browsers/types'
import { useEffect, useState } from 'react'
import { getFileUrl } from '../../file-system'
import WavesurferPlayer from '@wavesurfer/react'

type SampleProps = {
  sample: LibSample<Library>
}

export const Sample = ({ sample }: SampleProps) => {
  const [wavUrl, setWavUrl] = useState<string>()

  useEffect(() => {
    if (sample.fsFile) {
      getFileUrl(sample.fsFile).then(setWavUrl)
    }
  }, [setWavUrl, sample.fsFile])

  return (
    <Box>
      {sample.fsFile?.name}
      <WavesurferPlayer
        url={wavUrl}
        height={50}
        waveColor={'red'}
        barWidth={1}
      />
    </Box>
  )
}
