import styled from 'styled-components';
import { breakpoints } from '../../core/generalStyle';

export const PopupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  width: 100vw;
  background-color: white;
  align-items: center;
  ${breakpoints('width', 'vw', [
    { 1600: 60 },
    { 800: 50 },
    { 450: 40 }
  ])}
`;

export const PopupBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
