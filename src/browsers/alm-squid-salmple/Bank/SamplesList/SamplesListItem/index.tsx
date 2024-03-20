import { useEffect, useState } from "react"
import { getSampleFileHandle, getSampleName } from "../../../utils"
import { getFileUrl } from "../../../../../utils"
import { Outer, Wave, WaveOuter, WaveInner } from "./styled"

type SamplesListItemProps = {
  bankDirHandle: FileSystemDirectoryHandle
  sampleNumber: number
}

export const SamplesListItem = ({
  bankDirHandle,
  sampleNumber,
}: SamplesListItemProps) => {
  const [wavUrl, setWavUrl] = useState<string>()
  const [wavFileHandle, setWavFileHandle] = useState<FileSystemFileHandle>()

  useEffect(() => {
    getSampleFileHandle(bankDirHandle, sampleNumber).then(setWavFileHandle)
  }, [setWavUrl, bankDirHandle, sampleNumber])

  useEffect(() => {
    getFileUrl(wavFileHandle).then(setWavUrl)
  }, [setWavUrl, wavFileHandle])

  return (
    <Outer>
      {`Sample ${sampleNumber} `}
      {getSampleName(wavFileHandle)}

      <WaveOuter>
        <WaveInner>
          <Wave
            url={wavUrl}
          />
        </WaveInner>
      </WaveOuter>
    </Outer>
  )
}
