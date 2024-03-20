import styled from "styled-components"

export const Shell = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: stretch;
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  flex: 1;
`
