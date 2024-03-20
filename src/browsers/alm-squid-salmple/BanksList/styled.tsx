import styled from 'styled-components'

export const ItemOuter = styled.div<{ isSelected: boolean }>`
  background: ${({ isSelected }) => (isSelected ? 'red' : 'black')};
  color: white;
  display: flex;
  border-radius: 5px;
  text-align: center;
  padding: 0 0.5rem;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
`

export const BankNumber = styled.span`
  font-weight: 700;
  width: 1.5rem;
  margin-right: 1rem;
  text-align: right;
`

export const BankName = styled.span`
  font-weight: 200;
`
