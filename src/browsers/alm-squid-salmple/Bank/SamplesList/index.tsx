import { SamplesListItem } from './SamplesListItem'
import { Outer } from './styled'
import { useLibrary } from '../../useLibrary'

type SamplesListProps = {
  bankKey: string
}

export const SamplesList = ({ bankKey }: SamplesListProps) => {
  const [library] = useLibrary()
  const bank = library.groups[0]?.banks.find(({ key }) => key === bankKey)

  return (
    <Outer>
      {bank?.voices.map((voice) => (
        <SamplesListItem
          key={voice.key}
          bankKey={bankKey}
          voiceKey={voice.key}
        />
      ))}
    </Outer>
  )
}
