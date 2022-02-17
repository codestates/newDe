import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    
    box-sizing: border-box;
    
  }
  html {
      font-size:62.5%;
  }

  body {
    margin: 0 ;
    padding: 0 ; 
    width: 100%;
  }
`

export default GlobalStyle