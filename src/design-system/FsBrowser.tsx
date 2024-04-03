import _TreeView, { flattenTree } from 'react-accessible-treeview'
import { FsDir } from '../file-system'
import { useMemo } from 'react'
import styled from 'styled-components'
import { token } from '@atlaskit/tokens'
import { Scrollable } from './Scrollable'
import { Stack } from '@atlaskit/primitives'

const TreeView = styled(_TreeView)`
  &,
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
    <Stack grow={'hug'}>
      <Scrollable>
        <TreeView
          data={data}
          nodeRenderer={({ element, getNodeProps }) => (
            <div {...getNodeProps()}>{element.name}</div>
          )}
        />
      </Scrollable>
    </Stack>
  )
}
