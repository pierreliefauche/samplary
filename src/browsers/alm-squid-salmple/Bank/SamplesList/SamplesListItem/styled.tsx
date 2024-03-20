import { Card, Inset } from "@radix-ui/themes"
import WavesurferPlayer from "@wavesurfer/react"
import styled from "styled-components"

export const Outer = styled(Card)``
export const WaveOuter = styled(Inset).attrs(() => ({
  side: "bottom",
  mt: "2",
}))`
  height: 50px;
  border-top: var(--card-border-width) solid var(--gray-3);
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
  waveColor: "lightgrey",
  barWidth: 1,
  progressColor: "lightgrey",
}))``
