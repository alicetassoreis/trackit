import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Lexend Deca';
  }

  body {
  background-color: #f2f2f2;
    margin: 0;
    padding: 0;
      height: 100%;
  width: 100%;
  }

  button {
    cursor: pointer;
  }
      #root {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
  }
`

export default GlobalStyle;
