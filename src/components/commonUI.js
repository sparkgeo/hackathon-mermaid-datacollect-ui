import styled, { css } from 'styled-components'

export const Row = styled.div`
  display: flex;
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Table = styled('table')`
  table-layout: fixed;
  background-color: #f6f6f6};
`

export const Th = styled('th')(
  (props) => css`
    background-color: #666666;
    color: #ffffff;
    font-weight: normal;
    padding: 10px;
    text-align: left;
    text-transform: uppercase;
    text-align: ${props.align || 'left'};

    ${props.isSorted &&
    props.isSortedDescending &&
    `
      &::after {
        content: ' \u25bc';
      }
    `}
    ${props.isSorted &&
    !props.isSortedDescending &&
    `
      &::after {
        content: ' \u25b2';
      }
    `}
  `,
)

export const Td = styled('td')`
  padding: 10px;
  text-align: ${(props) => props.align || 'left'};
`
export const Tr = styled('tr')`
  &:nth-child(even) {
    background-color: #ccc9c3;
  }
`
