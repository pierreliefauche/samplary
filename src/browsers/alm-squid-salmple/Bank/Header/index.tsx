import { Outer, Title } from './styled'
import { useLibrary } from '../../useLibrary'

type HeaderProps = {
  bankKey: string
}

export const Header = ({ bankKey }: HeaderProps) => {
  const [library] = useLibrary()

  // const onChangeBankName: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (event) => {
  //     bankDirHandle &&
  //       saveBankName(bankDirHandle, event.target.value).then(setBankName)
  //   },
  //   [bankDirHandle, setBankName],
  // )

  const bank = library.groups[0]?.banks.find(({ key }) => key === bankKey)

  return (
    <Outer>
      <Title>
        {bank?.key}
        {bank?.name}
      </Title>
    </Outer>
  )
}
