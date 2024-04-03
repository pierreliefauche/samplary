import { useEffect, useState } from 'react'
import { Outer, Wave, WaveOuter, WaveInner } from './styled'
import { useLibrary } from '../../../useLibrary'
import { getFileUrl } from '../../../../../file-system'

type SamplesListItemProps = {
  bankKey: string
  voiceKey: string
}

export const SamplesListItem = ({
  bankKey,
  voiceKey,
}: SamplesListItemProps) => {
  const [library] = useLibrary()
  const bank = library.groups[0]?.banks.find(({ key }) => key === bankKey)
  const voice = bank?.voices.find(({ key }) => key === voiceKey)
  const sample = voice?.samples[0]

  const [wavUrl, setWavUrl] = useState<string>()

  useEffect(() => {
    if (sample?.fsFile) {
      getFileUrl(sample?.fsFile).then(setWavUrl)
    }
  }, [setWavUrl, sample?.fsFile])

  // const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (event) => {
  //     bankDirHandle &&
  //       saveSampleName(bankDirHandle, sampleNumber, event.target.value)
  //   },
  //   [bankDirHandle, sampleNumber],
  // )

  return (
    <Outer>
      {`Sample ${sample?.key} `}
      {voice?.name || sample?.fsFile?.name}

      <WaveOuter>
        <WaveInner>
          <Wave url={wavUrl} />
        </WaveInner>
      </WaveOuter>
    </Outer>
  )
}
