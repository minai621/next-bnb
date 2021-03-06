import reset from 'styled-reset';
import { createGlobalStyle, css } from 'styled-components';
import paltte from './palette';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${paltte.black};
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: ${paltte.black};
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
