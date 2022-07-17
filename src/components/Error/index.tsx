import styled from 'styled-components';
import { PStyle400, breakpoints } from '../../core/generalStyle';

export const ErrorButton = styled.a`
  -webkit-appearance: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  color: white;
  text-align: center;
  line-height: 24px;
  
  border-radius: 4px;
  padding: 18px 0px;
  width: 174px;
  margin: 20px;
  background-color: darkred;
  &:hover{
    background-color: red;
  }
`;

export const ErrorDescription = styled.div`
  ${PStyle400};
  color: red;
  padding-left: 0;
  padding-right: 0;
  ${breakpoints('max-width', 'px', [
    { 1600: 800 },
    { 800: 400 },
    { 450: 200 }
  ])}
`;
