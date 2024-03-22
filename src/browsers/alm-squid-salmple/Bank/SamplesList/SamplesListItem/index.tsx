import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import {
  getSampleFileHandle,
  getSampleName,
  saveSampleName,
} from '../../../utils'
import { Outer, Wave, WaveOuter, WaveInner } from './styled'
import { useLibrary } from '../../../useLibrary'
import { getFileUrl } from '../../../../../file-system'

type SamplesListItemProps = {
  bankNumber: string
  sampleNumber: string
}

export const SamplesListItem = ({
  bankNumber,
  sampleNumber,
}: SamplesListItemProps) => {
  const [library] = useLibrary()
  const [wavUrl, setWavUrl] = useState<string>()

  const sample = library.banks[bankNumber]?.samples[sampleNumber]

  useEffect(() => {
    getFileUrl(sample?.fsItem).then(setWavUrl)
  }, [setWavUrl, sample?.fsItem])

  // const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (event) => {
  //     bankDirHandle &&
  //       saveSampleName(bankDirHandle, sampleNumber, event.target.value)
  //   },
  //   [bankDirHandle, sampleNumber],
  // )

  return (
    <Outer>
      {`Sample ${sampleNumber} `}
      {sample?.name}

      <WaveOuter>
        <WaveInner>
          <Wave url={wavUrl} />
        </WaveInner>
      </WaveOuter>
    </Outer>
  )
}
