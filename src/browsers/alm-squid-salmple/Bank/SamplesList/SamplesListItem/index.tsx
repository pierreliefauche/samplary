import { useEffect, useState } from "react"
import WavesurferPlayer from "@wavesurfer/react"
import { getSampleFileHandle, getSampleName } from "../../../utils"
import { getFileUrl } from "../../../../../utils"
import { Card } from "@radix-ui/themes"

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
    <Card>
      {`Sample ${sampleNumber} `}
      {getSampleName(wavFileHandle)}
      <WavesurferPlayer
        height={100}
        width={600}
        waveColor={"lightgrey"}
        url={wavUrl}
        mediaControls
        barWidth={1}
        progressColor={"grey"}
        // barGap={1}
        // media[]
        // onReady={onReady}
        // onPlay={() => setIsPlaying(true)}
        // onPause={() => setIsPlaying(false)}
      />
    </Card>
  )
}
