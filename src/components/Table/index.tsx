import styled from 'styled-components';
import { breakpoints, PStyle400 } from '../../core/generalStyle';

export const StyledTh = styled.th`
  background-color: 'red';
  color: 'grey';
  ${PStyle400};
  padding-top: 10px;
  padding-bottom: 10px;
  white-space: nowrap;
`;

export const StyledTd = styled.td`
  padding: 6px;
  text-align: center;
  ${PStyle400};
`;

export const StyledTr = styled.tr`
  &:nth-child(odd) {
    background-color: white;
  }
  &:nth-child(even) {
    background-color: lightgray;
  }
`;

export const StyledTable = styled.table`
    table-layout: fixed ;
    /* ${(props:any) => (props.length > 2 ? `
    min-width: 700px;
    table-layout: auto;
    ` : `

    `)}; */
    border-collapse: collapse; 
  ${StyledTd}, ${StyledTh} {
    border: 1px solid grey;
  }
  
  tr {
    ${StyledTh} {
      &[scope="col"] {
        border-top: 0;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        border-left: 1px solid grey;

        &:first-child{
          border-left: 0;
        }
        &:last-child{
          border-right: 0;
        }
      }
      &[scope="row"] {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        border-left: 0;
      }
    }
    &:first-child{
      ${StyledTh}[scope="row"] {
        border-top: 0;
      }
    }
    &:last-child{
      ${StyledTh}[scope="row"] {
        border-bottom: 0;
      }
    }
  }
`;

export const TableContainer = styled.div`
  max-width: 900px;
  margin: auto;
  ${breakpoints('max-width', 'px', [
    { 1200: 800 },
    { 800: 600 },
    { 600: 400 },
    { 450: 300 }
  ])}
  overflow-x: auto;
`;
