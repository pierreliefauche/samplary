import { Outer, Title } from './styled'
import { useLibrary } from '../../useLibrary'

type HeaderProps = {
  bankNumber: string
}

export const Header = ({ bankNumber }: HeaderProps) => {
  const [library] = useLibrary()

  // const onChangeBankName: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (event) => {
  //     bankDirHandle &&
  //       saveBankName(bankDirHandle, event.target.value).then(setBankName)
  //   },
  //   [bankDirHandle, setBankName],
  // )

  return (
    <Outer>
      <Title>
        {`Bank ${bankNumber}`}
        {library.banks[bankNumber]?.name?.value}
      </Title>
    </Outer>
  )
}
