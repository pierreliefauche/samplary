import WavesurferPlayer from "@wavesurfer/react"
import { useEffect, useState } from "react"
import { WaveFile } from "wavefile"

type Props = {
  fileHandle: FileSystemFileHandle
}

export default function WavFile({ fileHandle }: Props) {
  const [wavUrl, setWavUrl] = useState<string>()
  const [wav, setWav] = useState<WaveFile>()

  useEffect(() => {
    setWavUrl(undefined)

    fileHandle
      .getFile()
      .then((file) => {
        setWavUrl(URL.createObjectURL(file))
        return file.arrayBuffer()
      })
      .then((buffer) => {
        setWav(new WaveFile(new Uint8Array(buffer)))
      })
  }, [fileHandle, setWavUrl, setWav])

  return (
    <div>
      {!!wav && (
        <p>
          Container: {wav.container}
          <br />
          ChunkSize: {wav.chunkSize}
          <br />
          Tags: {JSON.stringify(wav.listTags())}
          <br />
          Cue Points: {JSON.stringify(wav.listCuePoints())}
        </p>
      )}
      {!!wavUrl && (
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
      )}
    </div>
  )
}
