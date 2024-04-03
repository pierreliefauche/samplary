import TreeView, { flattenTree } from 'react-accessible-treeview'
import { FsDir } from '../file-system'
import { useMemo } from 'react'
import styled from 'styled-components'
import { token } from '@atlaskit/tokens'

const Outer = styled.div`
  .tree,
  .tree-node-group {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tree-node-group {
    padding-left: ${token('space.250')};
  }

  .tree-node {
    border-radius: ${token('border.radius.200')};
    padding: ${token('space.025')} ${token('space.100')};
    &:hover {
      background: ${token('color.background.neutral.subtle.hovered')};
    }
  }

  .tree-node--focused {
  }
`

type FsBrowserProps = {
  rootDir: FsDir
}

export const FsBrowser = ({ rootDir }: FsBrowserProps) => {
  const data = useMemo(() => flattenTree(rootDir), [rootDir])

  return (
    <Outer>
      <TreeView
        data={data}
        nodeRenderer={({ element, getNodeProps }) => (
          <div {...getNodeProps()}>{element.name}</div>
        )}
      />
    </Outer>
  )
}
