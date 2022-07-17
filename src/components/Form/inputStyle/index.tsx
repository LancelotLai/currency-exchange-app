import { css } from 'styled-components';

const inputStyle = css`
  appearance: none !important;
  border: none;
  font-size: 1rem;
  line-height: 22px;
  width: 100%;
  padding: 0;
  color: grey;
  ::placeholder{
      color: lightgrey;
      opacity: 1;
  };
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: lightgrey;
  };
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: lightgrey;
  };
`;

export default inputStyle;
