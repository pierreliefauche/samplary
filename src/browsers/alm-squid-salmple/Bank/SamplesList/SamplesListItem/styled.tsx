import { Bleed, Box } from '@atlaskit/primitives'
import { token } from '@atlaskit/tokens'
import WavesurferPlayer from '@wavesurfer/react'
import styled from 'styled-components'

export const Outer = styled(Box)``
export const WaveOuter = styled(Bleed)`
  height: 50px;
  border-top: ${token('border.width')} solid ${token('color.border')};
`

export const WaveInner = styled.div`
  /* position: absolute;
  left: 0;
  right: 0;
  top: ;
  bottom: 0; */
`

export const Wave = styled(WavesurferPlayer).attrs(() => ({
  height: 50,
  // width: 200,
  waveColor: 'lightgrey',
  barWidth: 1,
  progressColor: 'lightgrey',
}))``
